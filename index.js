const http = require("http")
const { read_file, write_file } = require("./fs/file-manager")
const uuid = require ("uuid")
const bcrypt = require("bcryptjs")

const options = {"content-type": "application/json", "access-control-allow-origin": "*"}

const app = http.createServer((req, res) => {
    const parsedId = req.url.split("/")[2]


    ////// GET all users
    if (req.method === "GET" && req.url === "/get_all_users") {
        const users = read_file("user.json")

        res.writeHead(200, options)
        res.end(JSON.stringify(users))
    }

    // ADD user
    if (req.method === "POST" && req.url === "/add_user") {
        req.on("data", async (chunk) => {
            const userData = JSON.parse(chunk)
            const users = read_file("user.json")

            const hashed = await bcrypt.hash(userData.password, 12)

            users.push({
                id: uuid.v4(),
                username: userData.username,
                email: userData.email,
                password: hashed
            })

            res.writeHead(201, options)
            write_file("user.json", users)
            res.end(JSON.stringify({
                message: "Added new user"
            }))
        })
    }

    console.log(req.url);
    

    // GET one user
    if (req.method === "GET" && req.url === `/get_one_user/${parsedId}`) {
        const users = read_file("user.json")

        const foundedUser = users.find((u) => u.id === parsedId)

        if (!foundedUser) {
           res.writeHead(400, options)
            return res.end(JSON.stringify({
              message: "User not found"
            }))
        }

        res.writeHead(200, options)
        res.end(JSON.stringify(foundedUser))
    }

    // UPTADE USER
    if (req.method === "PUT" && req.url === "/update_user/" + parsedId) {
        req.on("data", (chunk) => {
            const userData = JSON.parse(chunk)
            const { username, email, password } = userData
            const users = read_file("user.json")

            const foundedUser = users.find((item) => item.id === parsedId)

            if (!foundedUser) {
                res.writableHead(404, options)
                return res.end(JSON.stringify({
                message: "User not found"
              }))
            }

            users.forEach(async (item) => {
                if (item.id === parsedId) {
                    item.username = username ? username : item.username
                    item.email = email ? email : item.email
                    item.password = password ? await bcrypt.hash(password, 12) : item.password
                }
            })

            write_file("user.json", users)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Updated user"
            }))
        })
    }

    // DELETE user

    if (req.method === "DELETE" && req.url === "/delete_user/" + parsedId) {
        const users = read_file("user.json")

            const foundedUser = users.find((item) => item.id === parsedId)

            if (!foundedUser) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                message: "User not found"
              }))
            }

             users.forEach(async (item, idx) => {
                if (item.id === parsedId) {
                  users.splice(idx, 1)
                }
            })

             write_file("user.json", users)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Deleted user",
            }))
    }

    // PATCH (PARTIAL UPDATE)
    if (req.method === "PATCH" && req.url === "/change_password/" + parsedId) {
        req.on("data", async (chunk) => {
            const useData = JSON.parse(chunk)
            const { old_password, new_password } = useData

            const users = read_file("user.json")
            const foundedUser = users.find((u) => u.id === parsedId)

            if (!foundedUser) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                message: "User not found"
              }),
            )
          }
          
        })
    }

     ////// GET ALL CAR
    if (req.method === "GET" && req.url === "/get_all_car") {
        const car = read_file("car.json")

        res.writeHead(200, options)
        res.end(JSON.stringify(car))
    }

    // ADD CAR
    if (req.method === "POST" && req.url === "/add_car") {
        req.on("data", async (chunk) => {
            const carData = JSON.parse(chunk)
            const car = read_file("car.json")

            car.push({
            id: uuid.v4(),
            title: carData.title
});
            res.writeHead(201, options)
            write_file("car.json", car)
            res.end(JSON.stringify({
                message: "Added new car"
            }))
        })
    }

    console.log(req.url);

    // GET ONE CAR
    if (req.method === "GET" && req.url === `/get_one_car/${parsedId}`) {
        const car = read_file("car.json")

        const foundedCar = car.find((u) => u.id === parsedId)

        if (!foundedCar) {
           res.writeHead(400, options)
            return res.end(JSON.stringify({
              message: "Car not found"
            }))
        }

        res.writeHead(200, options)
        res.end(JSON.stringify(foundedCar))
    }

    // UPTADE CAR
    if (req.method === "PUT" && req.url === "/update_car/" + parsedId) {
        req.on("data", (chunk) => {
            const carData = JSON.parse(chunk)
            const { title } = carData
            const car = read_file("car.json")

            const foundedCar = car.find((item) => item.id === parsedId)

            if (!foundedCar) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                message: "Car not found"
              }))
            }

            car.forEach((item) => {
        if (item.id === parsedId) {
            item.title = title ? title : item.title;
        }
       });

            write_file("car.json", car)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Updated car"
            }))
        })
    }

    // DELETE CAR

    if (req.method === "DELETE" && req.url === "/delete_car/" + parsedId) {
        const car = read_file("car.json")

            const foundedCar = car.find((item) => item.id === parsedId)

            if (!foundedCar) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                message: "Car not found"
              }))
            }

             car.forEach(async (item, idx) => {
                if (item.id === parsedId) {
                  car.splice(idx, 1)
                }
            })

            const filteredCar = car.filter((item) => item.id !== parsedId);

             write_file("car.json", filteredCar)
             res.writeHead(200, options)
             res.end(JSON.stringify({
                message: "Deleted car",
            }))
    }

    // PATCH (PARTIAL UPDATE)
    if (req.method === "PATCH" && req.url === "/change_password/" + parsedId) {
        req.on("data", async (chunk) => {
            const useData = JSON.parse(chunk)
            const { old_password, new_password } = useData

            const users = read_file("user.json")
            const foundedUser = users.find((u) => u.id === parsedId)

            if (!foundedUser) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                message: "User not found"
              }),
            )
          }
          
        })
    }

        ////// GET ALL FLOWERS
    if (req.method === "GET" && req.url === "/get_all_flowers") {
        const flowers = read_file("flowers.json")

        res.writeHead(200, options)
        res.end(JSON.stringify(flowers))
    }

    // ADD FLOWER
    if (req.method === "POST" && req.url === "/add_flower") {
        req.on("data", (chunk) => {
            const flowerData = JSON.parse(chunk)
            const flowers = read_file("flowers.json")

            flowers.push({
                id: uuid.v4(),
                title: flowerData.title
            })

            write_file("flowers.json", flowers)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "Added new flower"
            }))
        })
    }

    // GET ONE FLOWER
    if (req.method === "GET" && req.url === `/get_one_flower/${parsedId}`) {
        const flowers = read_file("flowers.json")

        const foundedFlower = flowers.find((item) => item.id === parsedId)

        if (!foundedFlower) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Flower not found"
            }))
        }

        res.writeHead(200, options)
        res.end(JSON.stringify(foundedFlower))
    }

    // UPDATE FLOWER
    if (req.method === "PUT" && req.url === "/update_flower/" + parsedId) {
        req.on("data", (chunk) => {
            const flowerData = JSON.parse(chunk)
            const { title } = flowerData
            const flowers = read_file("flowers.json")

            const foundedFlower = flowers.find((item) => item.id === parsedId)

            if (!foundedFlower) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message: "Flower not found"
                }))
            }

            flowers.forEach((item) => {
                if (item.id === parsedId) {
                    item.title = title ? title : item.title
                }
            })

            write_file("flowers.json", flowers)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Updated flower"
            }))
        })
    }

    // DELETE FLOWER
    if (req.method === "DELETE" && req.url === "/delete_flower/" + parsedId) {
        const flowers = read_file("flowers.json")

        const foundedFlower = flowers.find((item) => item.id === parsedId)

        if (!foundedFlower) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Flower not found"
            }))
        }

        const filteredFlowers = flowers.filter((item) => item.id !== parsedId)

        write_file("flowers.json", filteredFlowers)
        res.writeHead(200, options)
        res.end(JSON.stringify({
            message: "Deleted flower"
        }))
    }

        ////// GET ALL FOODS
    if (req.method === "GET" && req.url === "/get_all_foods") {
        const foods = read_file("foods.json")

        res.writeHead(200, options)
        res.end(JSON.stringify(foods))
    }

    // ADD FOOD
    if (req.method === "POST" && req.url === "/add_food") {
        req.on("data", (chunk) => {
            const foodData = JSON.parse(chunk)
            const foods = read_file("foods.json")

            foods.push({
                id: uuid.v4(),
                title: foodData.title
            })

            write_file("foods.json", foods)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "Added new food"
            }))
        })
    }

    // GET ONE FOOD
    if (req.method === "GET" && req.url === `/get_one_food/${parsedId}`) {
        const foods = read_file("foods.json")

        const foundedFood = foods.find((item) => item.id === parsedId)

        if (!foundedFood) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Food not found"
            }))
        }

        res.writeHead(200, options)
        res.end(JSON.stringify(foundedFood))
    }

    // UPDATE FOOD
    if (req.method === "PUT" && req.url === "/update_food/" + parsedId) {
        req.on("data", (chunk) => {
            const foodData = JSON.parse(chunk)
            const { title } = foodData
            const foods = read_file("foods.json")

            const foundedFood = foods.find((item) => item.id === parsedId)

            if (!foundedFood) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message: "Food not found"
                }))
            }

            foods.forEach((item) => {
                if (item.id === parsedId) {
                    item.title = title ? title : item.title
                }
            })

            write_file("foods.json", foods)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Updated food"
            }))
        })
    }

    // DELETE FOOD
    if (req.method === "DELETE" && req.url === "/delete_food/" + parsedId) {
        const foods = read_file("foods.json")

        const foundedFood = foods.find((item) => item.id === parsedId)

        if (!foundedFood) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Food not found"
            }))
        }

        const filteredFoods = foods.filter((item) => item.id !== parsedId)

        write_file("foods.json", filteredFoods)
        res.writeHead(200, options)
        res.end(JSON.stringify({
            message: "Deleted food"
        }))
    }

        ////// GET ALL BOOKS
    if (req.method === "GET" && req.url === "/get_all_books") {
        const books = read_file("books.json")

        res.writeHead(200, options)
        res.end(JSON.stringify(books))
    }

    // ADD BOOK
    if (req.method === "POST" && req.url === "/add_book") {
        req.on("data", (chunk) => {
            const bookData = JSON.parse(chunk)
            const books = read_file("books.json")

            books.push({
                id: uuid.v4(),
                title: bookData.title
            })

            write_file("books.json", books)
            res.writeHead(201, options)
            res.end(JSON.stringify({
                message: "Added new book"
            }))
        })
    }

    // GET ONE BOOK
    if (req.method === "GET" && req.url === `/get_one_book/${parsedId}`) {
        const books = read_file("books.json")

        const foundedBook = books.find((item) => item.id === parsedId)

        if (!foundedBook) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Book not found"
            }))
        }

        res.writeHead(200, options)
        res.end(JSON.stringify(foundedBook))
    }

    // UPDATE BOOK
    if (req.method === "PUT" && req.url === "/update_book/" + parsedId) {
        req.on("data", (chunk) => {
            const bookData = JSON.parse(chunk)
            const { title } = bookData
            const books = read_file("books.json")

            const foundedBook = books.find((item) => item.id === parsedId)

            if (!foundedBook) {
                res.writeHead(404, options)
                return res.end(JSON.stringify({
                    message: "Book not found"
                }))
            }

            books.forEach((item) => {
                if (item.id === parsedId) {
                    item.title = title ? title : item.title
                }
            })

            write_file("books.json", books)
            res.writeHead(200, options)
            res.end(JSON.stringify({
                message: "Updated book"
            }))
        })
    }

    // DELETE BOOK
    if (req.method === "DELETE" && req.url === "/delete_book/" + parsedId) {
        const books = read_file("books.json")

        const foundedBook = books.find((item) => item.id === parsedId)

        if (!foundedBook) {
            res.writeHead(404, options)
            return res.end(JSON.stringify({
                message: "Book not found"
            }))
        }

        const filteredBooks = books.filter((item) => item.id !== parsedId)

        write_file("books.json", filteredBooks)
        res.writeHead(200, options)
        res.end(JSON.stringify({
            message: "Deleted book"
        }))
    }
    
})

app.listen(3000, () => {
    console.log("Server is running at: 3000");
})