cat /resources/roles.json | mongoimport --uri "mongodb://database:27017/strapi" --mode=upsert --collection=users-permissions_role
cat /resources/users.json | mongoimport --uri "mongodb://database:27017/strapi" --mode=upsert --collection=users-permissions_user
cat /resources/perms.json | mongoimport --uri "mongodb://database:27017/strapi" --mode=upsert --collection=users-permissions_permission
