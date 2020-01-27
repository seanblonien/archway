FROM mongo:3.4.23

COPY ./resources /resources
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]

#ENV MONGO_INITDB_DATABASE=strapi
#ENV MONGO_INITDB_ROOT_USERNAME=root
#ENV MONGO_INITDB_ROOT_PASSWORD=capstone

#CMD ["cat", "/resources/roles.json"]
#CMD ["cat", "/start.sh"]
#CMD mongoimport --uri "mongodb://database:27017/strapi" --collection=users-permissions_role --file=/resources/roles.json
#CMD ["bash", "/start.sh"]
#CMD mongoimport --uri "mongodb://database:27017/strapi" --collection=users-permissions_role --file=/resources/roles.json

#RUN apt-get update && apt-get install -y curl
#CMD mongoimport --uri "mongodb://database:27017/strapi" --collection=users-permissions_role --file=/resources/roles.json
#RUN mongoimport --host=database --port=27017 --username=root --password=capstone --db=strapi --collection=users-permissions_role --file=/resources/roles.json
#RUN mongoimport --uri "mongodb://root:capstone@database:27017/strapi" --collection=users-permissions_role > /resources/roles.json
