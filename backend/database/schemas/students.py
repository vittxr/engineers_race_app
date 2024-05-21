from pydantic import BaseModel
from database.schemas import OptionalModel


class Student(BaseModel):
    """
    Represents a student.

    Attributes:
        id (int): The unique identifier of the student.
        name (str): The name of the student.
        RA (str): The registration number of the student.
    """

    id: int
    name: str
    RA: str


class StudentCreate(BaseModel):
    """
    Represents the schema for creating a new student.

    Attributes:
        name (str): The name of the student.
        RA (str): The RA (Registration Number) of the student.
    """

    name: str
    RA: str


class StudentUpdate(StudentCreate, OptionalModel):
    """
    Represents a schema for updating a student.

    Attributes:
        Inherits all attributes from the `StudentCreate`, but all attributes are optional.
    """

    pass
