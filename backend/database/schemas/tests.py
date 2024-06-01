from typing import Literal, Optional, TypeVar, Type
from pydantic import BaseModel
from database.schemas.squads import Squad
from database.schemas.utils import OptionalModel
from utils.constants import FIRST_TEST, SECOND_TEST, THIRD_TEST

T = TypeVar("T", bound="Test")


class Test(BaseModel):
    """
    Represents a test.

    Attributes:
        id (int): The ID of the test.
        name (str): The name of the test
        value (int): The value of the test.
        value_description (str): The description of the test value. (Distância percorrida, Tempo feito, Peso retentor)
        penalty (Optional[float], optional): The penalty of the test. Defaults to None. This value is added to "value" attribute.
        penalty_description (Optional[str], optional): The description of the test penalty. Defaults to None. (Saída de pista)
        squad_id (int): The ID of the squad associated with the test.
    """

    id: int
    name: str
    value: int
    value_description: str
    penalty: Optional[float] = None
    penalty_description: Optional[str] = None
    # squad_id: int
    squad: Squad

    @classmethod
    def get_grades(cls: Type[T], tests: list[T]) -> dict[str, float]:
        pass

    @classmethod
    def generate_podium_of_test_type(cls: Type[T], tests: list[T]):
        """
        This method returns the podium of the tests, accordinly to the tests values. The tests need to be the same type!

        For FIRST_TEST, the value is sorted in descending order.
        For SECOND_TEST, the value is sorted in ascending order.
        For THIRD_TEST, the value is sorted in descending order.

        Args:
            tests (list[T]): A list of tests.
        """
        all_tests_are_the_same_type = all(
            [test.name == tests[0].name for test in tests]
        )

        if not all_tests_are_the_same_type:
            raise TypeError("All tests must be the same type!")

        if tests[0].name == FIRST_TEST or tests[0].name == THIRD_TEST:
            return sorted(tests, key=lambda test: test.value, reverse=True)

        if tests[0].name == SECOND_TEST:
            return sorted(tests, key=lambda test: test.value)


class TestCreate(BaseModel):
    """
    Represents a test creation request.

    Attributes:
        name (str): The name of the test
        value (int):
        value_description (str):
        penalty (Optional[float], optional):
        penalty_description (Optional[str], optional):
        squad_id (int):
    """

    name: str
    value: float
    value_description: Literal["metros", "segundos", "gramas"]
    penalty: Optional[float] = None
    penalty_description: Optional[str] = None
    squad_id: int


class TestUpdate(TestCreate, OptionalModel):
    """
    Represents a test update request. Inherits from TestCreate and OptionalModel.
    """

    pass
