import sys
import os

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    print("Attempting to import app.main...")
    from app.main import app
    print("Successfully imported app.main.app:", app)
except ImportError as e:
    print(f"ImportError: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
    import traceback
    traceback.print_exc()

print("sys.path is:", sys.path)
