import os
from dotenv import load_dotenv
import pymysql.cursors

load_dotenv()

# Connect to the database
connection = pymysql.connect(
    host=os.getenv("DB_HOST") or "",
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD") or "",
    database=os.getenv("DB_NAME"),
    cursorclass=pymysql.cursors.DictCursor,
    autocommit=True,
)
