#!/bin/bash

# Prompt for GitHub Username
read -p "Enter GitHub Username: " GITHUB_USER

# Prompt for GitHub Personal Access Token (PAT) securely
echo "Enter GitHub Personal Access Token (PAT) [hidden]:"
read -s GITHUB_TOKEN
echo ""

# Log in to GitHub Container Registry using sudo (for root access which docker run uses)
echo "Logging in to GitHub Container Registry..."
echo "$GITHUB_TOKEN" | sudo docker login ghcr.io -u "$GITHUB_USER" --password-stdin

if [ $? -eq 0 ]; then
    echo "Login Succeeded!"
    
    # Stop and remove existing container if it exists
    echo "Checking for existing container..."
    if sudo docker ps -a --format '{{.Names}}' | grep -q "^pilti-prod$"; then
        echo "Stopping existing container..."
        sudo docker stop pilti-prod
        echo "Removing existing container..."
        sudo docker rm pilti-prod
    else
        echo "No existing container found."
    fi
    
    # Remove old image to ensure we pull the latest
    echo "Removing old image (if exists)..."
    sudo docker rmi ghcr.io/piltismart/piltiwebsite:latest 2>/dev/null || echo "No old image to remove."
    
    # Pull the latest image
    echo "Pulling latest image..."
    sudo docker pull ghcr.io/piltismart/piltiwebsite:latest
    
    if [ $? -ne 0 ]; then
        echo "Failed to pull image. Exiting."
        exit 1
    fi
    
    # Run the container
    echo "Starting new container..."
    sudo docker run -d \
      -p 3000:3000 \
      --env-file pilti-modern/.env.local \
      --name pilti-prod \
      ghcr.io/piltismart/piltiwebsite:latest
      
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "Application is running at http://localhost:3000"
    else
        echo "❌ Failed to start container."
        exit 1
    fi
else
    echo "❌ Login Failed. Please check your username and PAT."
    exit 1
fi
