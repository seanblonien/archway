# Docker Commands

The following are Docker commands that we found helpful when interacting with Docker. Please reference the [docker](IntroductionToDocker.md) guide if you are not familiar with the terminology.

## General Docker Commands

Docker commands related to one image or container.

### Single Docker Container

- How to build a Docker image using one Dockerfile
  - `docker build -t <image-name:version-number> ./relative-path-to-Dockerfile-directory`
- How to run one Docker image
  - `docker run <image-name:version-number>`
  - `-it` for interactive input to the container, `-d` for detached mode, `--rm` to remove container after running
- Launch a bash shell on a running Linux container
  - `docker exec -it <container-name> bash`
- Run any command on a running container (i.e. apt, curl)
  - `docker exec -it <container-name> <command>`

### Docker Compose (Multiple Docker Containers)

- How to build/rebuild all of the images in the docker-compose file
  - `docker-compose build`
- How to build/rebuild one image in the docker-compose file
  - `docker-compose build <service-name>`
- How to run/startup all services/containers from the built docker-compose images
  - `docker-compose up`
- How to run/startup one service/container from the built docker-compose image
  - `docker-compose up <service-name>`
- How to takedown all services/containers (running or not) from the docker-compose file
  - `docker-compose down`
- How to takedown one service/container in the docker-compose file
  - `docker-compose down <service-name>`

### Reset Docker

- How to remove all unused objects for a specific object (containers, images, networks, and volume)
  - `docker <container|image|network|volume> prune`
- How to remove all unused containers, images, networks, and volumes (-a flag for all, need --volumes to include volumes)
  - `docker system prune -a --volumes`

## MongoDB Specific Docker Commands

Docker commands related to interfacing with a MongoDB container.

### General Mongo Commands

- Run a database dump on a running MongoDB container (for ONE database at a time)
  - `docker exec -it <mongodb-container-name> mongodump -o /path-to-export-directory-on-container --uri "mongodb://<user>:<password>@<mongodb-container-name>:<mongodb-port>/<database>?authSource=admin"`
- Run a database restore (from a dump) on a running MongoDB container (for ONE database at a time)
  - `docker exec -it <mongodb-container-name> mongorestore --uri "mongodb://<user>:<password>@<mongodb-container-name>:<mongodb-port>?authSource=admin" -d <database-name> /path-to-import-directory-on-container`
- Export a collection to json
  - `docker exec -it <mongodb-container-name> mongoexport --uri "mongodb://<user>:<password>@<mongodb-container-name>:<mongodb-port>?authSource=admin" --collection=<collection-name> --out=/path-to-json-output-in-docker-container`
- Import a collection from json
  - `docker exec -it <mongodb-container-name> mongoimport --uri "mongodb://<user>:<password>@<mongodb-container-name>:<mongodb-port>?authSource=admin" --mode=upsert --collection=<collection-name> --file=/path-to-json-file-input-in-docker-container`
- Copy file from container to host
  - `docker cp <container-name>:/file-path-on-container /file-path-on-host`
- Copy file from host to container
  - `docker cp /file-path-on-host <container-name>:/file-path-on-container`

### Mongo Shell Commands

- Launch an interactive Mongo shell on a running MongoDB container
  - `docker exec -it <mongodb-container-name> mongo "mongodb://<user>:<password>@<mongodb-container-name>:<mongodb-port>/<database>?authSource=admin"`
- In Mongo shell, use/switch to a database
  - `use <database-name>`
- In Mongo shell, drop a database
  - `use <database-name>`
  - `db.dropDatabase()`
- In Mongo shell and using a database, show all collections
  - `show collections`
- In Mongo shell and using a database, select/find/show all documents
  - `db.<collection-name>.find()`
- In Mongo shell and using a database, find a document in a collection with a query
  - `db.<collection-name>.find( {name: "name"} )`
