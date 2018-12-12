# Docker

## If on linux

`./deploy.sh`

## Build the app

`docker build -t graph .`

## Build the server

`cd server`

`docker build -t server .`

## Run the project

`docker run -p 5000:5000 -d server`

`docker run -p 3000:3000 -d graph`
