from typing import Optional
from pydantic import BaseModel
from database.schemas import Student, StudentCreate
from database.schemas.utils import OptionalModel


class Squad(BaseModel):
    """
    Represents a squad in the race.

    Attributes:
        id (int): The ID of the squad.
        name (str): The name of the squad.
        grade (float): The grade of the squad.
        car_id (str): The id of the car used by the squad.
    """

    id: Optional[int] = None
    name: Optional[str] = None
    grade: Optional[float] = None
    car_id: Optional[str] = None

    students: Optional[list[Student]] = None


class SquadCreate(BaseModel):
    """
    Represents the data required to create a new squad.

    Attributes:
        name (str): The name of the squad.
        car_id (str): The name of the id used by the squad.
        students (Optional[list[StudentCreate]]): The list of students in the squad. This attribute is optional.
    """

    name: str
    car_id: str

    students: Optional[list[StudentCreate]] = None


class SquadUpdate(SquadCreate, OptionalModel):
    """
    Represents the data required to create a new squad. Note that "students" attribute is not updatable.

    Attributes:
        name (str): The name of the squad.
        car_id (str): The name of the id used by the squad.
    """

    pass
