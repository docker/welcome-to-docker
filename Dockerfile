FROM ubuntu:latest

RUN apt-get update && apt-get install -y git

WORKDIR /app

COPY . .

RUN git config --global user.email "you@example.com" && \
    git config --global user.name "luiz" && \
    git add . && \
    git commit -m "commit message"

WORKDIR /app

COPY . .

RUN git config --global user.email "luiz.alessio@gmail.com.br" && \
    git config --global user.name "luiz2" && \
    git add . && \
    git commit -m "commit message"

CMD ["echo", "Hello, World!"]



