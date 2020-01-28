FROM mongo:3.4.23

COPY ./export /export

CMD mongorestore --uri "mongodb://root:capstone@database:27017/?authSource=admin" -d strapi export/strapi
