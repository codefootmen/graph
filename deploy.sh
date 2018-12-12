#!/bin/bash

docker build -t graph .
cd server
docker build -t server .
docker run -p 5000:5000 -d server
docker run -p 3000:3000 -d graph