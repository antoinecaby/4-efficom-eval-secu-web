const express = require("express");
const ipfilter = require("express-ipfilter").IpFilter;
const app = express();
const userRouter = require("./route/user.route.js");
const authRouter = require("./route/auth.route.js");
const messageRouter = require("./route/message.route.js");
const roleRouter = require("./route/role.route.js");
const { connect } = require("./framework/connection.js");
const sync = require("./framework/sync.js");

const database = async () => {
  await connect();
  await sync();
};

const ips = ["127.0.0.1", "127.0.0.2", "127.0.0.3", "127.0.0.4", "127.0.0.5"];

database();

app.use(ipfilter(ips, {}));

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/role", roleRouter);

module.exports = app;
