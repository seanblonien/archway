mongoimport --db strapi --collection users-permissions_role --file ./roles.json;
mongoimport --db strapi --collection users-permissions_user --file ./users.json;
mongoimport --db strapi --collection users-permissions_permission --file ./perms.json;