#!/bin/bash

echo What should the version be?
read VERSION

docker build -t robins1/lireddit:$VERSION .
docker push robins1/lireddit:$VERSION
ssh -i ~/Documents/aws-credentials/mern-app.pem ubuntu@13.127.47.111 "sudo docker pull robins1/lireddit:$VERSION && sudo docker tag robins1/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
