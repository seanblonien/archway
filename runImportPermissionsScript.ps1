docker build -t cappy:latest .;
docker pull gitlab.ecs.baylor.edu:5555/012019-capstone/section02-group01/mongo:production;
docker run -e MONGO_INITDB_DATABASE=strapi --name strapi-mongo-scripted -d gitlab.ecs.baylor.edu:5555/012019-capstone/section02-group01/mongo:production;
docker cp .\importPermissions.bash strapi-mongo-scripted:.;
docker cp .\users.json strapi-mongo-scripted:.;
docker cp .\perms.json strapi-mongo-scripted:.;
docker cp .\roles.json strapi-mongo-scripted:.;
docker exec -it strapi-mongo-scripted /bin/bash -c ./importPermissions.bash;
sleep 10s;
docker pull gitlab.ecs.baylor.edu:5555/012019-capstone/section02-group01/strapi:production;
docker run -e APP_NAME=strapi-app -e DATABASE_CLIENT=mongo -e DATABASE_HOST=strapi-mongo-scripted -e DATABASE_PORT=27017 -e DATABASE_NAME=strapi --link strapi-mongo-scripted -p 1337:1337 --name strapi-scripted -d gitlab.ecs.baylor.edu:5555/012019-capstone/section02-group01/strapi:production;
docker run -p 3000:3000 -d cappy