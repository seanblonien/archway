# base image
FROM node:13.6.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install --silent
WORKDIR /usr/src/app
EXPOSE 3000

# start application
CMD ["npm","start"]
