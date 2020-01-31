# Base MongoDB image
FROM mongo:3.4.23

# Sets up database called 'strapi'
ENV MONGO_INITDB_DATABASE=strapi
# Makes login username 'root' with password 'capstone'
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=capstone

# Exposees this port so that other services can access the database within the container
EXPOSE 27017

# MongoDB daemon starts automatically when the container starts