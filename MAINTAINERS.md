# Maintaining the docker/welcome-to-docker Image

This document is for maintainers of this repository.

## Docker Hub Image

The image is stored on Docker Hub in the [`docker/welcome-to-docker`](https://hub.docker.com/r/docker/welcome-to-docker) repository.

For the `latest` tag, we are using the `small-image` branch to make the first walkthrough user experience optimal. Every commit to `main` will be automatically merged to `small-image` via GitHub Actions.

## Deploying Changes

We do not currently have automation for pushing the changes to the image repository, so this is a manual step. First, wait for `small-image` to have the changes merged in and then run the following to build and push:
```bash
git checkout small-image
docker buildx create --name mybuilder --use --bootstrap # only if not created before
docker buildx build --push --platform linux/amd64,linux/arm64 --tag docker/welcome-to-docker .
```

Be sure to verify the changes. Run the following command and visit http://localhost:8088 to verify the changes were successfully deployed.

```bash
docker run --pull always -p 8088:80 docker/welcome-to-docker:latest
```
