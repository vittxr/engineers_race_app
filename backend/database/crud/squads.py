from database.crud import create_students
from database.schemas import Squad, SquadCreate, SquadUpdate
from dependencies import connection


async def get_squads():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM squads")
        return cursor.fetchall()


async def create_squad(squad: SquadCreate):
    """
    Create a new squad.

    Args:
        squad (SquadCreate): The data required to create a new squad.

    Returns:
        Squad: The created squad.
    """
    with connection.cursor() as cursor:
        sql = "INSERT INTO squads (name, car_id) VALUES (%s, %s) RETURNING *"
        cursor.execute(sql, (squad.name, squad.car_id))
        db_squad = cursor.fetchone()
        students = await (
            create_students(squad.students, db_squad["id"]) if squad.students else []
        )
        return Squad(**db_squad, students=students)


async def update_squad(id: int, squad: SquadUpdate) -> None:
    """
    Update a squad.

    Args:
        id (int): The squad id.

    Returns:
        None
    """
    with connection.cursor() as cursor:
        squad = squad.model_dump(
            exclude_none=True,
        )
        set_clause = ", ".join([f"{column} = %s" for column in squad.keys()])
        sql = f"UPDATE squads SET {set_clause} WHERE id = %s"
        sql_data = tuple(squad.values())
        cursor.execute(sql, (*sql_data, id))


async def delete_squad(id: int) -> None:
    """
    Delete a squad.

    Args:
        id (int): The squad id.

    Returns:
        None
    """
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM squads WHERE id = %s", (id,))
