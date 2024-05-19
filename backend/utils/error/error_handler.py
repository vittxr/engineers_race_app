from typing import Any
from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from pymysql import OperationalError as DBOperationalError
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from utils.error.error_messages import DB_CONNECTION_ERROR, UNKNOWN_DB_COLUMN

CORS_HEADER = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT",
}


class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Any) -> Response:
        try:
            return await call_next(request)
        except DBOperationalError as e:
            if e.args[0] == 1054:
                return JSONResponse(
                    status_code=400,
                    content={"detail": UNKNOWN_DB_COLUMN},
                    headers=CORS_HEADER,
                )
            if e.args[0] == 1045:
                return JSONResponse(
                    status_code=500,
                    content={"detail": DB_CONNECTION_ERROR},
                    headers=CORS_HEADER,
                )

            return JSONResponse(
                status_code=400, content={"detail": str(e)}, headers=CORS_HEADER
            )
        except ValidationError as e:
            return JSONResponse(
                status_code=400,
                content={"detail": e.errors()[0]["msg"].split("Value error, ")[-1]},
                headers=CORS_HEADER,
            )
        except Exception as e:
            return JSONResponse(
                status_code=400, content={"detail": str(e)}, headers=CORS_HEADER
            )
