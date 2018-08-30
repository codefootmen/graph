# Graphs theory and algorithms

## To run

### Docker

```shell
docker build -t graph/app .
docker run -p 8080:8080 -d graph/app
```

Then in the browser: <http://localhost:8080/>

### Development

```shell
git clone https://github.com/codefootmen/graph.git
cd graph
npm install
npm run wdev
```