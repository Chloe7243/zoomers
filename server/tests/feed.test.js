describe("Posts", () => {
  let token;
  before((done) => {
    // Log in and get token before tests
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
        token = res.body.token;
        done();
      });
  });

  describe("/POST post", () => {
    it("it should create a new post", (done) => {
      let post = {
        content: "This is a test post",
      };
      chai
        .request(server)
        .post("/add-new-post")
        .set("Authorization", `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Post created successfully");
          done();
        });
    });
  });

  describe("/GET posts", () => {
    it("it should get all posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
