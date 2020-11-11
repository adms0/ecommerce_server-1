const request = require("supertest");
const app = require("../app")
const { sequelize } = require("../models")
const {User} = require("../models/index")
const { queryInterface } = sequelize


afterAll((done) => {
    queryInterface
        .bulkDelete("Users")
        .then(() => done())
        .catch((err) => {
            done();
        });
});

describe("Register / Success Case", () => {
    test("Should send an object with keys: message, status-code, id, email, role", (done) => {
        request(app)
            .post("/register")
            .send({
                email: "admin@mail.com",
                password: "1234jlm",
                role: "admin"
            })
            .end(function (err, res) {
                console.log(res.body, "<<< respond ");
                if (err) throw err;
                else {
                    expect(res.status).toBe(201);
                    expect(res.body).toHaveProperty("message", "user success to register");
                    expect(res.body).toHaveProperty("status-code", 201);
                    expect(res.body).toHaveProperty("id", expect.any(Number));
                    expect(res.body).toHaveProperty("email", "admin@mail.com");
                    expect(res.body).not.toHaveProperty("password", "1234jlm");
                    expect(res.body).toHaveProperty("role");
                    done();
                }
                
            })
    })

    test("Password validation error ", (done) => {
        request(app)
            .post("/register")
            .send({
                email: "firdaus@mail.com",
                password: "",
                role: "admin"
            })
            .end((err, res) => {
                if (err) throw err;
                else {
                    expect(res.status).toBe(400);
                    expect(res.body).toHaveProperty("message", "password is required, password length minimum are six characters")
                    done()
                }
            })
    })

    test("Email validation error", (done) => { 
        request(app)
            .post("/register")
            .send({ 
                email : "", 
                password : "1234jlm", 
                role : "admin"
            })
            .end((err, res) => { 
                if(err) throw err; 
                else {
                    expect(res.status).toBe(400);
                    expect(res.body).toHaveProperty("message", "Email is required, invalid email format")
                    done()
                }
            })
    })

})