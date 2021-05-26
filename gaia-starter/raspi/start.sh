#!/bin/sh

echo '######################################'
echo '     _____          _____          	  \n    / ____|   /\   |_   _|   /\    	  \n   | |  __   /  \    | |    /  \   	  \n   | | |_ | / /\ \   | |   / /\ \  	  \n   | |__| |/ ____ \ _| |_ / ____ \    \n    \_____/_/    \_\_____/_/    \_\ \n'
echo '######################################\n'
echo 'Start...\n'

# Get Docker Images
echo 'Pull docker images\n'
docker pull pigtastic/gaia-ui
docker pull pigtastic/gaia-server
docker pull andresvidal/rpi3-mongodb3

#Build mongodb directory
# mkdir -p ~/mongo/data

# Start Containers
echo '\nStart-up\n'
docker-compose up --detach

echo '\n FINISH'
