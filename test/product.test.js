const request = require("supertest")
const app = require("../app")
const { User } = require("../models/index")
const { signToken } = require("../helpers/jwt.helper")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

describe('Product Routes Test', () => {

    let inital_token = '';

    const dataUser = {
        email: 'budi@mail.com',
        password: '1234jlm',
        role: 'admin'
    }

    const dataUser2 = {
        email: 'ono@mail.com',
        password: '1234jlm',
        role: 'admin'
    }

    beforeAll(done => {
        User.create(dataUser)
            .then(user => {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                initial_token = signToken(payload)
                done()
            }).catch(err => {
                done(err)
            })
    })

    afterAll(done => {
        queryInterface.bulkDelete('Users', {})
            // .then(() => queryInterface.bulkDelete('Products', {}))
            .then(() => done())
            .catch((err) => done(err))
    })

    describe('POST / product - create new product', () => {
        test('Should send an object with keys id, name, image_url, stock and price', (done) => {
            request(app)
                .post('/products')
                .set('token', initial_token)
                .send({
                    name: 'mesin jahit portable',
                    image_url: 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2017/3/17/1759092/1759092_07d8cd0e-51a2-4916-90fa-d5a335c23a00.jpg',
                    price: 9,
                    stock: 10
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('image_url', 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2017/3/17/1759092/1759092_07d8cd0e-51a2-4916-90fa-d5a335c23a00.jpg')
                        expect(res.body).toHaveProperty('price', 9),
                        expect(res.body).toHaveProperty('stock', 10)
                        done()
                    }
                })
        })

        test('Should return error if image_url is empty', (done) => {
            request(app)
                .post('/products')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: '',
                    price: 235,
                    stock: 100
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'image url is required, should in url format')
                        done()
                    }
                })
        })

        test('Should return error if name is empty', (done) => {
            request(app)
                .post('/products')
                .set('token', initial_token)
                .send({
                    name: '',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: 10
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'name is required')
                        done()
                    }
                })
        })

        test('Should return error if price is null', (done) => {
            request(app)
                .post('/products')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: null,
                    stock: 0
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'price cannot be null')
                        done()
                    }
                })
        })

        test('Should return error if stock is null', (done) => {
            request(app)
                .post('/products')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: null
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'stock cannot be null')
                        done()
                    }
                })
        })

        test('Should return error if initial token not provided', (done) => {
            request(app)
                .post('/products')
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: 100
                })
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'Authentication failed')
                        done()
                    }
                })
        })

    })

    describe('GET / Product - get product', () => {
        test('Should return success with provided initial token', (done) => {
            request(app)
                .get('/products')
                .set('token', initial_token)
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(200)
                        expect(res.body[0]).toHaveProperty('id', expect.any(Number))
                        expect(res.body[0]).toHaveProperty('name', 'mesin jahit portable')
                        expect(res.body[0]).toHaveProperty('image_url', 'https://ecs7-p.tokopedia.net/img/cache/200-square/product-1/2017/3/17/1759092/1759092_07d8cd0e-51a2-4916-90fa-d5a335c23a00.jpg')
                        expect(res.body[0]).toHaveProperty('price', 9)
                        expect(res.body[0]).toHaveProperty('stock', 10)
                        done()
                    }
                })
        })

        test('Should return error if initial token is not provided', (done) => {
            request(app)
                .get('/products')
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'Authentication failed')
                        done()
                    }
                })
        })

    })

    describe('PUT / Products - Edit product', () => {
        test('should send object with name, image_url, price, stock', (done) => {
            request(app)
                .put('/products/49')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: 75
                }).end((err, res) => {
                    console.log(res.body[1], '<<< res body [1][0]');
                    if (err) throw err
                    else {
                        expect(res.status).toBe(200)
                        expect(res.body[1][0]).toHaveProperty('id', expect.any(Number))
                        expect(res.body[1][0]).toHaveProperty('name', 'mesin cuci portable')
                        expect(res.body[1][0]).toHaveProperty('image_url', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741')
                        expect(res.body[1][0]).toHaveProperty('price', 235)
                        expect(res.body[1][0]).toHaveProperty('stock', 75)
                        done()
                    }
                })
        })

        test('Should return error if stock is empty', (done) => {
            request(app)
                .put('/products/49')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: null
                }).end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'stock cannot be null')
                        done()
                    }
                })
        })

        test('Should return error if name is empty', (done) => {
            request(app)
                .put('/products/49')
                .set('token', initial_token)
                .send({
                    name: '',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: 235,
                    stock: 100
                }).end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'name is required')
                        done()
                    }
                })
        })

        test('Should return error if image url is empty', (done) => {
            request(app)
                .put('/products/49')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: '',
                    price: 235,
                    stock: 100
                }).end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'image url is required, should in url format')
                        done()
                    }
                })
        })

        test('Should return error if null url is empty', (done) => {
            request(app)
                .put('/products/49')
                .set('token', initial_token)
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: null,
                    stock: 100
                }).end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'price cannot be null')
                        done()
                    }
                })
        })

        test('Should return error if access toke not provided', (done) => {
            request(app)
                .put('/products/49')
                .send({
                    name: 'mesin cuci portable',
                    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/22641819/22641819_7195250e-8820-437a-913d-1a2cee3296b1_741_741',
                    price: null,
                    stock: 100
                }).end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'Authentication failed')
                        done()
                    }
                })
        })

    })

    describe("Delete Product / ", () => {
        test("Successs delete products ", (done) => {
            request(app)
                .delete("/products/34")
                .set("token", initial_token)
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty("message", "product success to delete")
                        done()
                    }
                })
        })

        test("Should send error if access token not provided ", (done) => {
            request(app)
                .delete("/products/50")
                .end((err, res) => {
                    if (err) throw err
                    else {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', 'Authentication failed')
                        done()
                    }
                })
        })
    })


})