const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
// const UserService = require("./services/user-service");
const setUpAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });

  // const userService = new UserService();
  // const newToken = userService.createToken({
  //   email: "skmadaan11@gmail.com",
  //   id: 4,
  // });
  // console.log(newToken);
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNrbWFkYWFuMTFAZ21haWwuY29tIiwiaWQiOjQsImlhdCI6MTY4NDE3NjU5OCwiZXhwIjoxNjg0MTgwMTk4fQ.oTsaoIDhuGKbxsbYX5gEhUjds62vbIuyqZiHkJwYvKE";
  // console.log(userService.verifyToken(token));
};
setUpAndStartServer();
