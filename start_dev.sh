#!/bin/bash

# Function to find a free port starting from a default
find_free_port() {
    local port=$1
    while :; do
        # Check if port is in use (using netstat or lsof or ss or python)
        # Python is the most portable way in this env
        python3 -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.bind(('', $port)); s.close()" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo $port
            return
        fi
        port=$((port + 1))
    done
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend stopped."
    fi
    exit 0
}

trap cleanup SIGINT

echo "🚀 Starting MetaShelf Development Environment..."

# --- 1. Find Free Port ---
DESIRED_PORT=8000
BACKEND_PORT=$(find_free_port $DESIRED_PORT)
echo "🔎 Found available backend port: $BACKEND_PORT"

# --- 2. Backend Setup ---
echo "------------------------------------------------"
echo "🔧 Setting up Backend..."
cd backend || { echo "❌ 'backend' directory not found"; exit 1; }

PYTHON_CMD="python"
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
fi
echo "   Using Python: $($PYTHON_CMD --version)"

# Run Seeding
echo "   🌱 Checking database seeds..."
# Ensure PYTHONPATH allows importing 'app'
export PYTHONPATH=$PYTHONPATH:.
$PYTHON_CMD seed.py
SEED_STATUS=$?

if [ $SEED_STATUS -ne 0 ]; then
    echo "   ❌ Seed script failed. Check logs above."
    # We continue, but warn user
fi

# Start Backend
echo "   🔥 Starting Uvicorn on port $BACKEND_PORT..."
export PYTHONPATH=$PWD
$PYTHON_CMD -m uvicorn app.main:app --reload --port $BACKEND_PORT &
BACKEND_PID=$!
echo "   ✅ Backend running (PID: $BACKEND_PID)"

cd ..

# --- 3. Frontend Setup ---
echo "------------------------------------------------"
echo "🎨 Setting up Frontend..."
cd frontend || { echo "❌ 'frontend' directory not found"; cleanup; }

echo "   📦 Starting Vite server..."
# Pass the dynamic port to Vite via environment variable
export VITE_BACKEND_PORT=$BACKEND_PORT

npm run dev

cleanup