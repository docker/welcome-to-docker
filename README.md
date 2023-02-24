# Welcome to Docker - Final

docker build -t nunocoracao/welcome-to-docker . 
docker run -d -p 8080:3000 --name welcome-to-docker nunocoracao/welcome-to-docker
docker push nunocoracao/welcome-to-docker

docker buildx create --name mybuilder --use --bootstrap
docker buildx build --push --platform linux/amd64,linux/arm64 --tag nunocoracao/welcome-to-docker .

docker run -d -p 8080:3000 nunocoracao/welcome-to-docker && open http://localhost:8080

TO BE WRITTEN