from typing import Literal, Optional, TypeVar, Type
from pydantic import BaseModel, computed_field
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
        value (float): The value of the test.
        value_description (str): The description of the test value. (Distância percorrida, Tempo feito, Peso retentor)
        penalty (Optional[float], optional): The penalty of the test. Defaults to None. This value is added to "value" attribute.
        penalty_description (Optional[str], optional): The description of the test penalty. Defaults to None. (Saída de pista)
        grade: Optional[float]: The grade of the test. It is calculated based on the test value. This value is not stored in database.
        squad_id (int): The ID of the squad associated with the test.
    """

    id: int
    name: str
    value: float
    value_description: str
    penalty: Optional[float] = None
    penalty_description: Optional[str] = None
    grade: Optional[float] = None
    squad: Squad

    @computed_field
    def final_value(self) -> float:
        return self.value + (self.penalty or 0)

    @classmethod
    def get_grades(cls: Type[T], tests: list[T]):
        """
        This method returns the grades of the tests.

        Args:
            tests (list[T]): A list of tests.

        Returns:
            dict[str, float]: A dictionary with the grades of the tests.
        """
        first_tests = [test for test in tests if test.name == FIRST_TEST]
        second_tests = [test for test in tests if test.name == SECOND_TEST]
        third_tests = [test for test in tests if test.name == THIRD_TEST]

        first_tests = sorted(
            first_tests, key=lambda test: test.final_value, reverse=True
        )
        second_tests = sorted(second_tests, key=lambda test: test.final_value)
        third_tests = sorted(
            third_tests, key=lambda test: test.final_value, reverse=True
        )

        grades_according_to_position = {
            1: 1.0,
            2: 1.0,
            3: 1.0,
            4: 0.8,
            5: 0.8,
            6: 0.8,
            7: 0.6,
            8: 0.6,
        }

        def calc_grade(sorted_tests: list[T]):
            for i, test in enumerate(sorted_tests):
                if test.final_value == 0:
                    grade = 0
                elif i + 1 not in grades_according_to_position:
                    grade = 0.4
                else:
                    grade = grades_according_to_position[i + 1]

                sorted_tests[i].grade = round(grade, 2)

            return sorted_tests

        sorted_first_tests = calc_grade(first_tests)
        sorted_second_tests = calc_grade(second_tests)
        sorted_third_tests = calc_grade(third_tests)

        return {
            "first_tests": sorted_first_tests,
            "second_tests": sorted_second_tests,
            "third_tests": sorted_third_tests,
        }

    @classmethod
    # TODO: GERAR O PODIUM GERAL COM BASE NAS NOTAS, MAS GERAR O PODIUM DE CADA TIPO DE TESTE TAMBÈM.
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
            return sorted(tests, key=lambda test: test.final_value, reverse=True)

        if tests[0].name == SECOND_TEST:
            return sorted(tests, key=lambda test: test.final_value)


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
