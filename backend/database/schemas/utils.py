from typing import Any, Optional
from pydantic import BaseModel, Field


class OptionalModel(BaseModel):
    """
    A Pydantic model that sets default values for all fields to None.

    This model is useful when you want to define a Pydantic model with optional fields,
    where the default value for each field is None.

    Example usage:
    ```
    class PartialUser(User, OptionalModel):
        pass
    ```
    """

    @classmethod
    def __pydantic_init_subclass__(cls, **kwargs: Any) -> None:
        super().__pydantic_init_subclass__(**kwargs)

        for field in cls.model_fields.values():
            field.default = None

        cls.model_rebuild(force=True)


class RequestParams(BaseModel):
    """
    Represents the request parameters that client-side can use to filter data. All parameters are optional, but should be typed properly.

    Attributes:
        q (str): The search query.
        cols (list[str]): The list of columns to retrieve.
        page (int): The page number.
        limit (int): The maximum number of results per page.
        order (str): The sorting order.
        order_by (str): The column to sort by.
    """

    q: Optional[str] = None
    cols: Optional[str] = None
    page: Optional[int] = 1
    limit: Optional[int] = Field(default=10, ge=1, le=10)
    order_by: Optional[str] = "id"
    order: Optional[str] = "DESC"
