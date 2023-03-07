# Welcome to Docker

Build and run
```
docker build -t welcome-to-docker . 
docker run -d -p 8088:3000 --name welcome-to-docker welcome-to-docker
```

Cross platform build
```
docker buildx create --name mybuilder --use --bootstrap
docker buildx build --platform linux/amd64,linux/arm64 --tag welcome-to-docker .
```
