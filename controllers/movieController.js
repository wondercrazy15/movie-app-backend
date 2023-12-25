// movieController.js
const Movie = require("../models/movieModel");
const upload = require("../config/fileUpload");

// Create a new movie
const createMovie = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: true, message: "Error uploading file" });
            }
            const { title, publishingYear, userId } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: true, message: "No file uploaded" });
            }
            const newMovie = new Movie({
                title: title,
                publishingYear: publishingYear,
                userId: userId,
                poster: {
                    data: req.file.filename,
                    contentType: req.file.mimetype
                }
            });
            await newMovie.save();
            res.status(201).json({ data: true, error: false });
        });
    } catch (error) {
        res.status(500).json({ data: false, error: true, errMsg: error });
    }
};


// Edit an existing movie
const editMovie = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: true, message: "Error uploading file" });
            }
            const { id } = req.params;
            const { title, publishingYear } = req.body;

            if (!req.file) {
                await Movie.findByIdAndUpdate(
                    id, { title, publishingYear }, { new: true }
                );
                return res.status(200).json({ data: true, error: false });
            }

            const poster = {
                data: req.file.filename,
                contentType: req.file.mimetype
            };
            await Movie.findByIdAndUpdate(
                id, { title, publishingYear, poster }, { new: true }
            );
            res.status(200).json({ data: true, error: false });
        });
    } catch (error) {
        res.status(500).json({ data: false, error: true, errMsg: error });
    }
};

// List movies with pagination
const listMovies = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const userId = req.params.userId; 
    try {
        const movies = await Movie.find({ userId: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const filteredMovies = movies.map(movie => {
            const { userId, ...movieDataWithoutUserId } = movie.toObject();
            return movieDataWithoutUserId;
        });
        res.status(200).json({
            movies: filteredMovies,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            data: false,
            error: true
        });
    }
};

module.exports = { createMovie, editMovie, listMovies };
