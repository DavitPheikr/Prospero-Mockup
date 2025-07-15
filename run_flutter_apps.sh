#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Function to run a Flutter app on a specific port
run_flutter_app() {
  local project_path=$1
  local port=$2
  local project_name=$3

  if [ -z "$port" ]; then
    echo "Error: Port for $project_name is not defined in .env file."
    return
  fi

  echo "Starting $project_name on port $port..."
  (cd "$project_path" && flutter run -d web-server --web-port "$port") &
}

# Run the Prospero_client_creaton_mockup app
run_flutter_app "Prospero_client_creaton_mockup" "$CLIENT_CREATION_PORT" "Client Creation App"

# Run the Prospero_user_meetings_mockup app
run_flutter_app "Prospero_user_meetings_mockup" "$USER_MEETINGS_PORT" "User Meetings App"

echo "Both Flutter applications have been started." 