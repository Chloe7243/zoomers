const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app"); // Adjust the path to your app
const User = require("../models/user"); // Adjust to your User model

const should = chai.should();
chai.use(chaiHttp);

describe("Authentication", () => {
  describe("/POST signup", () => {
    it("it should register a new user", (done) => {
      let user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should = should;
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Signed up successfully");
          done();
        });
    });

    it("it should not register a user with an existing email", (done) => {
      let user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("E-mail Address already exists!");
          done();
        });
    });

    it("it should not register a user with an existing username", (done) => {
      let user = {
        username: "testuser",
        email: "testuser2@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Username already taken!");
          done();
        });
    });

    it("it should not register a user with an invalid email", (done) => {
      let user = {
        firstname: "Test",
        lastname: "User",
        username: "testuser",
        email: "invalidemail",
        password: "password123",
        dob: "1990-01-01",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql("Please enter a valid email.");
          done();
        });
    });

    it("it should not register a user with an empty firstname", (done) => {
      let user = {
        firstname: "",
        lastname: "User",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        dob: "1990-01-01",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql("Firstname must not be empty");
          done();
        });
    });

    it("it should not register a user with an empty lastname", (done) => {
      let user = {
        firstname: "Test",
        lastname: "",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        dob: "1990-01-01",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql("Lastname must not be empty");
          done();
        });
    });

    it("it should not register a user with an empty username", (done) => {
      let user = {
        firstname: "Test",
        lastname: "User",
        username: "",
        email: "testuser@example.com",
        password: "password123",
        dob: "1990-01-01",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql("Username must not be empty");
          done();
        });
    });

    it("it should not register a user with an invalid password", (done) => {
      let user = {
        firstname: "Test",
        lastname: "User",
        username: "testuser",
        email: "testuser@example.com",
        password: "short",
        dob: "1990-01-01",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql(
            "Password must consist of letters and numbers and must be a minimum of 8 characters"
          );
          done();
        });
    });

    it("it should not register a user with an invalid date of birth", (done) => {
      let user = {
        firstname: "Test",
        lastname: "User",
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        dob: "invalid-date",
      };
      chai
        .request(server)
        .post("/signup-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.errors[0].msg.should.eql("dob must be a valid date!");
          done();
        });
    });
  });

  describe("/POST login", () => {
    it("it should login a user", (done) => {
      let user = {
        email: "testuser@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/login-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("authToken");
          done();
        });
    });

    it("it should not login a user with wrong password", (done) => {
      let user = {
        email: "testuser@example.com",
        password: "wrongpassword",
      };
      chai
        .request(server)
        .post("/login-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Incorrect password.");
          done();
        });
    });

    it("it should not login a user that hasn't been registered", (done) => {
      let user = {
        email: "test@example.com",
        password: "wrongpassword",
      };
      chai
        .request(server)
        .post("/login-user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Email not found.");
          done();
        });
    });
  });
});
