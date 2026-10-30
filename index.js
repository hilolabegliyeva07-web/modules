const http = require("http");
const { read_file, write_file } = require("./file-system/file-system");

const app = http.createServer((req, res) => {
    //////////////// ------POSTS----------/////////////
    // GET
    if (req.method === "GET" && req.url === "/posts") {
        const fileData = read_file("posts.json")

        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(fileData, ))
    }

    // POST
    if (req.method === "POST" && req.url === "/add_post") {
        req.on("data", (chunk) => {
            const bodyData = JSON.parse(chunk);
            const fileData = read_file("posts.json")
            
            fileData.push(bodyData)
            write_file("posts.json", fileData)
            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify({
                message: "added new post"
            }))
        })
    }

    //////////////// ------POSTS----------/////////////
    // GET
    if (req.method === "GET" && req.url === "/car") {
        const fileData = read_file("car.json")

        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(fileData))
    }

    // POST
    if (req.method === "POST" && req.url === "/add_car") {
        req.on("data", (chunk) => {
            const bodyData = JSON.parse(chunk);
            const fileData = read_file("car.json")
            
            fileData.push(bodyData)
            write_file("car.json", fileData)
            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify({
                message: "added new post"
            }))
        })
    }

    // Flowers GET
    if (req.method === "GET" && req.url === "/flowers") {
        const fileData = read_file("flowers.json")

        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(fileData))
    }

    // POST

    if (req.method === "POST" && req.url === "/add_flowers") {
        req.on("data", (chunk) => {
            const bodyData = JSON.parse(chunk);
            const fileData = read_file("flowers.json")
            
            fileData.push(bodyData)
            write_file("flowers.json", fileData)
            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify({
                message: "added new post"
            }))
        })
    }

    /// Students GET

     if (req.method === "GET" && req.url === "/students") {
        const fileData = read_file("flowers.json")

        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(fileData))
    }

    // POST

    if (req.method === "POST" && req.url === "/add_students") {
        req.on("data", (chunk) => {
            const bodyData = JSON.parse(chunk);
            const fileData = read_file("students.json")
            
            fileData.push(bodyData)
            write_file("students.json", fileData)
            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify({
                message: "added new post"
            }))
        })
    }

     /// Users GET

     if (req.method === "GET" && req.url === "/users") {
        const fileData = read_file("users.json")

        res.writeHead(200, {"Content-type": "application/json"})
        res.end(JSON.stringify(fileData))
    }

    // POST

    if (req.method === "POST" && req.url === "/add_users") {
        req.on("data", (chunk) => {
            const bodyData = JSON.parse(chunk);
            const fileData = read_file("users.json")
            
            fileData.push(bodyData)
            write_file("users.json", fileData)
            res.writeHead(201, {"Content-type": "application/json"})
            res.end(JSON.stringify({
                message: "added new post"
            }))
        })
    }

});

app.listen(3000, () => {
    console.log("Server 3000-Portda ishladi");
    
})  // http://192.168.1.4:3000
