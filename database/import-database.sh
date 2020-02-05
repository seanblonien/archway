# Copy the dump zip file over to the container
docker cp ./database/dump.zip database:/dump.zip
# Delete any dump direcotry on the container
docker exec -it database rm -r /dump
# Unzip the dump zip into a directory
docker exec -it database unzip /dump.zip -d /
# Perform the data dump import of the strapi database
docker exec -it database mongorestore --uri "mongodb://root:capstone@database:27017/?authSource=admin" -d strapi /dump/strapi


