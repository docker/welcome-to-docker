# Maintaining the docker/welcome-to-docker Image

The image is stored on Docker Hub at the `docker/welcome-to-docker` repo.

For the `latest` tag, we are using the `small-image` branch to make the first walkthrough user experience optimal. Any changes in `main` should be merged into `small-image` also.

To push a change to the welcome-to-docker Hub image:
```
git checkout small-image
docker buildx create --name mybuilder --use --bootstrap # only if not created before
docker buildx build --push --platform linux/amd64,linux/arm64 --tag docker/welcome-to-docker .
```
