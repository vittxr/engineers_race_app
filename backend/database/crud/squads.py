import json
from typing import Any
from database.crud import create_students
from database.crud.students import delete_students_from_squad
from database.schemas import SquadCreate, SquadUpdate
from database.schemas.students import Student
from dependencies import connection
from utils.error.error_messages import CANNOT_CREATE_SQUAD, SQUAD_NOT_FOUND
from contextlib import closing


async def get_squads():
    with closing(connection.cursor()) as cursor:
        cursor.execute("SELECT s.id, s.name FROM squads AS s")
        return cursor.fetchall()


async def get_squad(id: int):
    with closing(connection.cursor()) as cursor:
        cursor.execute(
            """SELECT 
                s.id, 
                s.name, 
                s.car_id,
                (
                    SELECT JSON_ARRAYAGG(JSON_OBJECT('id', st.id, 'name', st.name, 'RA', st.RA)) 
                    FROM students AS st WHERE st.squad_id = s.id
                ) as students 
            FROM squads AS s WHERE id = %s""",
            (id,),
        )
        data: dict[str, Any] | None = cursor.fetchone()
        if data is None:
            raise LookupError(SQUAD_NOT_FOUND)

        students: list[Student] = (
            json.loads(data["students"]) if data["students"] else []
        )
        return {
            **data,
            "students": students,
        }


async def create_squad(squad: SquadCreate) -> None:
    """
    Create a new squad.

    Args:
        squad (SquadCreate): The data required to create a new squad.

    Returns:
        Squad: The created squad.
    """
    with closing(connection.cursor()) as cursor:
        sql = "INSERT INTO squads (name, car_id) VALUES (%s, %s)"
        cursor.execute(sql, (squad.name, squad.car_id))
        cursor.execute("SELECT LAST_INSERT_ID() as id")
        db_squad = cursor.fetchone()

        if db_squad is None:
            raise Exception(CANNOT_CREATE_SQUAD)

        if squad.students:
            await create_students(squad.students, db_squad["id"])


async def update_squad(id: int, squad: SquadUpdate) -> None:
    """
    Update a squad.

    Args:
        id (int): The squad id.

    Returns:
        None
    """
    with closing(connection.cursor()) as cursor:
        dict_squad = squad.model_dump(
            exclude_none=True,
            exclude={"students"},
        )
        set_clause = ", ".join([f"{column} = %s" for column in dict_squad.keys()])
        sql = f"UPDATE squads SET {set_clause} WHERE id = %s"
        sql_data = tuple(dict_squad.values())

        cursor.execute(sql, (*sql_data, id))

        # this is npt a good solution, but it works. Here all students will be deleted from the squad and created again.
        await delete_students_from_squad(id)
        if squad.students:
            await create_students(squad.students, id)


async def delete_squad(id: int) -> None:
    """
    Delete a squad.

    Args:
        id (int): The squad id.

    Returns:
        None
    """
    with closing(connection.cursor()) as cursor:
        cursor.execute("DELETE FROM squads WHERE id = %s", (id,))
