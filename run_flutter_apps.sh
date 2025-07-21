#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Function to kill process on a specific port
kill_port() {
  local port=$1
  echo "Checking for existing processes on port $port..."
  
  # Find and kill processes using the port
  local pids=$(lsof -ti:$port 2>/dev/null)
  if [ ! -z "$pids" ]; then
    echo "Killing existing processes on port $port: $pids"
    kill -9 $pids 2>/dev/null
    sleep 2
  else
    echo "No existing processes found on port $port"
  fi
}

# Function to run a Flutter app on a specific port
run_flutter_app() {
  local project_path=$1
  local port=$2
  local project_name=$3

  if [ -z "$port" ]; then
    echo "Error: Port for $project_name is not defined in .env file."
    return
  fi

  # Kill any existing processes on this port
  kill_port $port

  echo "Installing dependencies for $project_name..."
  (cd "$project_path" && flutter pub get)

  echo "Starting $project_name on port $port with hot reload..."
  (cd "$project_path" && flutter run -d web-server --web-port "$port" --hot) &
}

# Kill any existing Flutter processes
echo "Stopping any existing Flutter processes..."
pkill -f "flutter run" 2>/dev/null || true
sleep 2

# Run the Prospero_client_creaton_mockup app
run_flutter_app "Prospero_client_creaton_mockup" "$CLIENT_CREATION_PORT" "Client Creation App"

# Run the Prospero_user_meetings_mockup app
run_flutter_app "Prospero_user_meetings_mockup" "$USER_MEETINGS_PORT" "User Meetings App"

echo "Both Flutter applications have been started with hot reload enabled." 