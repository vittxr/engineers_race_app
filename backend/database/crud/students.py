from database.schemas import StudentCreate
from dependencies.db import db_connection


async def get_students():
    """
    Retrieve all students from the database.

    Returns:
        A list of tuples representing the students' data.
    """
    with db_connection() as cursor:
        cursor.execute(
            """
            SELECT students.*, squads.id AS squad_id FROM students
            JOIN squads ON squads.id = students.squad_id
        """
        )
        return cursor.fetchall()


async def create_student(student: StudentCreate):
    pass


async def create_students(students: list[StudentCreate], squad_id: int):
    """
    Create students.

    Args:
        students (list[StudentCreate]): The data required to create a list of students.

    Returns:
        Student: The created students.
    """
    with db_connection() as cursor:
        sql = "INSERT INTO students (name, RA, squad_id) VALUES (%s, %s, %s)"
        data = [(student.name, student.RA, squad_id) for student in students]
        cursor.executemany(sql, data)
        data = cursor.fetchall()
        return data


async def delete_students_from_squad(squad_id: int):
    """
    Delete all students from a squad.

    Args:
        squad_id (int): The ID of the squad.
    """
    with db_connection() as cursor:
        cursor.execute("DELETE FROM students WHERE squad_id = %s", (squad_id,))
