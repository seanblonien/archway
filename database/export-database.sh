# Perform the data dump of the strapi database
docker exec -it database mongodump -o /dump --uri "mongodb://root:capstone@database:27017/strapi?authSource=admin"
# Compress the database dump into one zip file
docker exec -it database zip -r /dump.zip /dump
# Copy the dump zip file over to the local directory
docker cp database:/dump.zip ./database/dump.zip
