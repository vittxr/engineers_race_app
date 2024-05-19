from database.crud import create_squad, get_squads, delete_squad
from database.schemas import Squad
from database.schemas.squads import SquadCreate
from routes import squads_router


@squads_router.get("/", response_model=list[Squad])
async def get_squads_route():
    return await get_squads()


@squads_router.post("/", response_model=Squad)
async def create_squad_route(squad: SquadCreate):
    return await create_squad(squad)


@squads_router.put("/{id}", response_model=Squad)
async def update_squad_route(id: int, squad: SquadCreate):
    pass


@squads_router.delete("/{id}", response_model=None)
async def delete_squad_route(id: int):
    return await delete_squad(id)
