# Base node image to run the npm build scripts
FROM node:13.6.0

# Create and set the app's working directory (default directory for react-scripts)
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# aAdd node modules to the path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Exposees this port so that other services can access the database within the container
EXPOSE 3000

# Set the startup command to be the start script that runs the project
CMD ["npm","start"]
