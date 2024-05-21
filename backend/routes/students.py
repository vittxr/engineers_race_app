from database.crud import get_students
from database.schemas.students import Student
from routes import students_router


@students_router.get("/", response_model=list[Student])
async def get_students_route():
    return await get_students()
