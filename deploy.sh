#!/bin/bash

# Prompt for GitHub Username
read -p "Enter GitHub Username: " GITHUB_USER

# Prompt for GitHub Personal Access Token (PAT) securely
echo "Enter GitHub Personal Access Token (PAT) [hidden]:"
read -s GITHUB_TOKEN

# Log in to GitHub Container Registry using sudo (for root access which docker run uses)
echo "$GITHUB_TOKEN" | sudo docker login ghcr.io -u "$GITHUB_USER" --password-stdin

if [ $? -eq 0 ]; then
    echo "Login Succeeded!"
    
    # Run the container
    echo "Starting container..."
    sudo docker run -d \
      -p 3000:3000 \
      --env-file pilti-modern/.env.local \
      --name pilti-prod \
      ghcr.io/piltismart/piltiwebsite:latest
      
    if [ $? -eq 0 ]; then
        echo "Container started successfully."
    else
        echo "Failed to start container."
    fi
else
    echo "Login Failed. Please check your username and PAT."
fi
