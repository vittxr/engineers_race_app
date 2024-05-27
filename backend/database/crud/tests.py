from dependencies import connection


async def get_tests():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM tests AS t")
        return cursor.fetchall()
