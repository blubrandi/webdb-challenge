const express = require("express");

const router = require('express').Router();

router.get("/", (req, res, next) => {
    projects
        .get()
        .then(posts => {
            res.json(projects);
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: error, message: "Projects could not be retrieved." });
        });
});


module.exports = router;
