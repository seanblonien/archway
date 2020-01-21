FROM mongo:3.4.23

COPY ./resources /resources

RUN mongoimport --db strapi --collection users-permissions_role --file /resources/roles.json
RUN mongoimport --db strapi --collection users-permissions_user --file /resources/users.json
RUN mongoimport --db strapi --collection users-permissions_permission --file /resources/perms.json
