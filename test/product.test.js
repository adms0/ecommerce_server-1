const request = require("supertest")
const app = require("../app")
const { User } = require("../models/index")
const { signToken } = require("../helpers/jwt.helper")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

afterAll((done) => {

    queryInterface
        .bulkDelete("Users")
        .then(() => done())
        .catch((err) => {
            done();
        });
});

let initial_token = ""

beforeAll((done) => {
    User.create({
        email: "admin@mail.com",
        password: "1234jlm",
        role: "admin"
    }).then((user) => {
        const payload = {
            id: user.id,
            email: user.email
        }
        initial_token = signToken(payload)
        done()

    })
})

let data_product = {
    name: "kacrut",
    image_url: "www.google.com",
    price: 20000,
    stock: 3
}


describe("Create Product / Success case", () => {
    test("Should send object with keys: id, name, image_url, price, stock", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send(data_product)
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(201);
                    expect(res.body).toHaveProperty("id", expect.any(Number))
                    expect(res.body).toHaveProperty("name", data_product.name)
                    expect(res.body).toHaveProperty("image_url", data_product.image_url)
                    expect(res.body).toHaveProperty("price", data_product.price)
                    expect(res.body).toHaveProperty("stock", data_product.stock)
                    done()
                }
            })
    })

    test("Failed because of image validation error", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send({
                name: "kacrut",
                image_url: "",
                price: 0,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "image url is required, should in url format")
                    done()
                }
            })
    })


    test("Failed because of image does not in url format", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send({
                name: "kacrut",
                image_url: "google",
                price: 0,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "should in url format")
                    done()
                }
            })
    })


    test("Failed because of name validation error", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send({
                name: "",
                image_url: "www.google.com",
                price: 0,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "name is required")
                    done()
                }
            })
    })


    test("Failed because of price validation error", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send({
                name: "kacrut",
                image_url: "www.google.com",
                price: -1,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "price can never be negative")
                    done()
                }
            })
    })

    test("Failed because of product prive null", (done) => {
        request(app)
            .post("/products")
            .set("token", initial_token)
            .send({
                name: "kacrut",
                image_url: "www.google.com",
                price: null,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "price cannot be null")
                    done()
                }
            })
    })



    test("Failed because of authentication error", (done) => {
        request(app)
            .post("/products")
            .set("xxxx", initial_token)
            .send({
                name: "kacrut",
                image_url: "www.google.com",
                price: 0,
                stock: 0
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("message", "Authentication failed")
                    done()
                }
            })
    })
})



describe("Find product / get all product case", () => {
    test("Send params id", (done) => {
        request(app)
            .get("/products")
            .set("token", initial_token)
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(200)
                    expect(res.body[0]).toHaveProperty("id", expect.any(Number))
                    expect(res.body[0]).toHaveProperty("name", data_product.name)
                    expect(res.body[0]).toHaveProperty("image_url", data_product.image_url)
                    expect(res.body[0]).toHaveProperty("price", data_product.price)
                    expect(res.body[0]).toHaveProperty("stock", data_product.stock)
                    done()
                }
            })
    })

})


describe("Edit Product / success case ", () => {
    test("Should send object with keys: name, image_url, price, stock", (done) => {
        request(app)
            .put("/products/3")
            .set("token", initial_token)
            .send({
                name: "kacrut",
                image_url: "www.google.com",
                price: 1000,
                stock: 10
            })
            .end((err, res) => {
                console.log(res.body, "<<< res.body");
                if (err) throw err
                else {
                    expect(res.status).toBe(200)
                    expect(res.body[1][0]).toHaveProperty("id", expect.any(Number))
                    expect(res.body[1][0]).toHaveProperty("name", "kacrut")
                    expect(res.body[1][0]).toHaveProperty("image_url", "www.google.com")
                    expect(res.body[1][0]).toHaveProperty("price", 1000)
                    expect(res.body[1][0]).toHaveProperty("stock", 10)
                    done()
                }
            })
    })
})


describe("Delete Product / success case", () => {
    test("Should send params id", (done) => {
        request(app)
            .delete("/products/3")
            .set("token", initial_token)
            .end((err, res) => {
                console.log(res.body, "<<<< res body");
                if (err) throw err
                else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty("message", "product success to delete")
                    done()
                }
            })
    })
})