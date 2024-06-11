from contextlib import contextmanager
import os
from dotenv import load_dotenv
import pymysql.cursors

load_dotenv(override=True)


def get_db_connection():
    """
    Open db connection. You need to call "close_db_connection()" after using db connection!
    """

    connection = pymysql.connect(
        host=os.getenv("DB_HOST") or "",
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD") or "",
        database=os.getenv("DB_NAME"),
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )
    return connection


@contextmanager
def db_connection():
    """
    Establishes a database connection and returns a cursor object. Commit, rollback and error translation are handle in this function.

    Returns:
        cursor: A cursor object for executing database queries.

    Raises:
        Exception: raise translated error. It's necessary to handle it anyway, but this function modify th original error message.
    """
    db = get_db_connection()
    cursor = db.cursor()

    try:
        yield cursor

    except Exception as e:
        db.rollback()
        raise e

    finally:
        db.commit()
        db.close()
