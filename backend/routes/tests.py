from database.crud.tests import create_test, delete_test, get_tests, update_test
from database.schemas import Test, TestCreate, TestUpdate
from database.schemas.utils import RequestParams
from routes import tests_router


@tests_router.get("/", response_model=list[Test])
async def get_tests_route():
    return await get_tests()


@tests_router.get("/{id}/")
async def get_test_route(id: int):
    test = await get_tests(params=RequestParams(q=f"t.id = '{id}'"))
    if len(test) == 0:
        return None

    return test[0]


@tests_router.post("/", response_model=None)
async def create_test_route(test: TestCreate):
    return await create_test(test)


@tests_router.put("/{id}/", response_model=None)
async def update_test_route(id: int, test: TestUpdate):
    return await update_test(id, test)


@tests_router.delete("/{id}/", response_model=None)
async def delete_test_route(id: int):
    return await delete_test(id)
