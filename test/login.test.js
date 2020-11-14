const request = require("supertest")
const app = require("../app")
const { sequelize } = require("../models")
const { queryInterface } = sequelize

afterAll((done) => {
   
//    if(process.env.NODE_ENV == 'test') { 
//        User.destroy({truncate : true})
//         .then(() => done())
//         .catch((err) => done(err))
//    }
    queryInterface
        .bulkDelete("Users")
        .then(() => done())
        .catch((err) => {
            done();
        });
});



let user = {
    email: "admin@mail.com",
    password: "1234jlm",
    role: "admin"
}

describe("Test End Point /login ", () => {
    test("Should send an object with keys: token, email, password, role", (done) => {
        request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                if (err) throw err;
                else {
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty("token", expect.any(String))
                    done()
                }

            })
    })

    test("Failed because of invalid email", (done) => {
        request(app)
            .post("/login")
            .send({
                email: "faris@mail.com",
                password: "1234jlm",
                role: "admin"
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(401);
                    expect(res.body).toHaveProperty("message", "wrong email/password")
                    done()
                }
            })
    })

    test("Failed because of email and password empty", (done) => {
        request(app)
            .post("/login")
            .send({
                email: "",
                password: "",
                role: "admin"
            })
            .end((err, res) => {
                if (err) throw err
                else {
                    expect(res.status).toBe(401);
                    expect(res.body).toHaveProperty("message", "wrong email/password")
                    done()
                }
            })
    })


})
