const assert = require("assert");

const request = require("supertest");
describe("loading express", () => {
  //Server setup and teardown
  let server;

  beforeEach(() => {
    server = require("../server");
  });
  afterEach(() => {
    server.close();
  });

  it("responds to /ok", (done) => {
    request(server).get("/ok").expect(200, done);
  });

  it("respond 404 to /foo/bar", (done) => {
    request(server).get("/foo/bar").expect(404, done);
  });

  it("responds to /product", (done) => {
    request(server).get("/products").expect(200, done);
  }).timeout(4000);
});
