# Base Strapi image
FROM strapi/strapi:3.0.0-beta.20-node12

# The environment variables Strapi uses to connect to the database
# This can be overridden when running the container itself
ENV DATABASE_CLIENT=mongo
ENV DATABASE_HOST=database
ENV DATABASE_PORT=27017
ENV DATABASE_NAME=strapi
ENV DATABASE_USERNAME=root
ENV DATABASE_PASSWORD=capstone

# Add zip and unzip packages used for exporting/importing the Strapi uploads
RUN apt-get update -y && apt-get install -y zip unzip

# Exposes this port so that other services can access the database within the container
EXPOSE 1337
