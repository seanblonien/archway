# Base MongoDB image
FROM mongo:4.2.3-bionic

# Sets up database called 'strapi'
ENV MONGO_INITDB_DATABASE=strapi
# Makes login username 'root' with password 'capstone'
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=capstone

# Add zip and unzip packages used for exporting/importing the database
RUN apt-get update -y && apt-get install -y zip unzip

# Exposees this port so that other services can access the database within the container
EXPOSE 27017

# MongoDB daemon starts automatically when the container starts
