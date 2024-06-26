from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routes import squads_router, students_router, tests_router
from dotenv import load_dotenv

from utils.error.error_handler import ExceptionHandlerMiddleware

# from routes.squads import squads_router
load_dotenv()
app = FastAPI(
    title="Documentação da API Engineers Race",
    version="1.0.0",
)
origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://localhost:5173",
]

app.include_router(squads_router)
app.include_router(students_router)
app.include_router(tests_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(ExceptionHandlerMiddleware)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    # os.system("uvicorn main:app --reload")
