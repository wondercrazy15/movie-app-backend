// movieRoutes.js
const express = require("express");
const router = express.Router();
const { createMovie, editMovie, listMovies, getMovieById } = require("../controllers/movieController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/add", validateToken, createMovie);
router.put("/edit/:id", validateToken, editMovie);
router.get("/list", validateToken, listMovies);
router.get("/:id", validateToken, getMovieById);

module.exports = router;
