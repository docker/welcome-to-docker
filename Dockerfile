FROM ubuntu:latest

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY . .

RUN git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    git add . && \
    git commit -m "commit message"

CMD ["echo", "Hello, World!"]
WORKDIR /app

COPY . .

RUN git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    git add . && \
    git commit -m "commit message"

CMD ["echo", "Hello, World!"]

