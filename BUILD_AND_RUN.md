# How to Build and Run

To build and run this container from your terminal:

### 1. Build the image
```bash
docker build -t welcome-to-docker .
```

### 2. Run the container
```bash
docker run -d -p 8088:3000 --name welcome-to-docker welcome-to-docker
```

### 3. View in browser
Navigate to [http://localhost:8088](http://localhost:8088/).
