import json
from typing import Any
from database.schemas.tests import TestCreate, TestUpdate
from database.schemas.utils import RequestParams
from dependencies.db import db_connection


async def get_tests(params: RequestParams | None = None) -> list[dict[str, Any]]:
    with db_connection() as cursor:
        sql = """
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', t.id, 
                'name', t.name, 
                'value', t.value, 
                'value_description', t.value_description,
                'penalty', t.penalty, 
                'penalty_description', t.penalty_description, -- Added missing comma
                'squad', JSON_OBJECT(
                    'id', s.id, 
                    'name', s.name,
                    'car_id', s.car_id
                )
            )
        ) as json_result
        FROM tests AS t
        JOIN squads AS s ON (t.squad_id = s.id)
        {where};
        """.format(
            where=f"WHERE {params.q}" if params else ""
        )

        cursor.execute(sql)
        data = cursor.fetchone()
        if data is not None:
            return json.loads(data["json_result"]) if data["json_result"] else []
        return []


async def create_test(test: TestCreate) -> None:
    with db_connection() as cursor:
        dict_test = test.model_dump(
            exclude_none=True,
            exclude={"students"},
        )
        set_clause = ", ".join([f"{column} = %s" for column in dict_test.keys()])
        sql = f"INSERT INTO tests SET {set_clause}"
        sql_data = tuple(dict_test.values())

        cursor.execute(sql, sql_data)


async def update_test(id: int, test: TestUpdate) -> None:
    with db_connection() as cursor:
        dict_test = test.model_dump(exclude_none=True)
        set_clause = ", ".join([f"{column} = %s" for column in dict_test.keys()])
        sql = f"UPDATE tests SET {set_clause} WHERE id = %s"
        sql_data = tuple(dict_test.values()) + (id,)

        cursor.execute(sql, sql_data)


async def delete_test(id: int) -> None:
    with db_connection() as cursor:
        cursor.execute("DELETE FROM tests WHERE id = %s", (id,))
