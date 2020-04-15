const express = require('express');
const knex = require('knex');

const knexfile = require("../knexfile.js");

const db = knex(knexfile.development);

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
    .then(cars => res.json(cars))
    .catch(err => res.status(500).json({ message: "Cannot retrieve cars"}))
});

router.post("/", (req, res) => {
    const carData = req.body;
    db("cars").insert(carData)
    .then(ids => db("cars").where({ id: ids[0] }))
    .then(newCarEntry => res.status(201).json(newCarEntry))
    .catch(err => res.status(500).json({ message: "Error adding car"}))
});

router.delete("/:id", (req, res) => {
    db("cars").where("id", req.params.id).del()
    .then(num => res.status(200).json(num))
    .catch(error => res.status(500).json({ error: error.message }))
});

module.exports = router;