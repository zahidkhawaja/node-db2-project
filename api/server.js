const express = require('express');

const carsRouter = require("../cars/cars-router.js");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "API working"})
});

module.exports = server;