from sqlalchemy import create_engine, text
import getpass

password = getpass.getpass("PostgreSQL password: ")

url = f"postgresql+psycopg://postgres:{password}@localhost:5432/jobatlas"

print("Trying to connect...")

engine = create_engine(url)

try:
    with engine.connect() as conn:
        print("✅ Connected!")
        print(conn.execute(text("SELECT current_database();")).scalar())
except Exception as e:
    print("❌ Failed")
    print(e)