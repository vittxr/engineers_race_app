from database.crud.tests import get_tests
from database.schemas import Squad
from database.schemas.squads import SquadCreate, SquadUpdate
from routes import tests_router


@tests_router.get("/", response_model=list[Squad])
async def get_tests_route():
    return await get_tests()


@tests_router.get("/{id}/", response_model=Squad)
async def get_test_route(id: int):
    pass


@tests_router.post("/", response_model=None)
async def create_test_route(squad: SquadCreate):
    pass


@tests_router.put("/{id}/", response_model=None)
async def update_test_route(id: int, squad: SquadUpdate):
    pass


@tests_router.delete("/{id}/", response_model=None)
async def delete_test_route(id: int):
    pass
