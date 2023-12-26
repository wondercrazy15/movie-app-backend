const multer = require("multer");
const Movie = require("../models/movieModel");

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage }).single('poster');

// Create a new movie
const createMovie = async (req, res) => {
    const { id } = req.user;
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        const { title, publishingYear } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: true, message: "No file uploaded" });
        }
        const newMovie = new Movie({
            title: title,
            publishingYear: publishingYear,
            userId: id,
            poster: {
                data: req.file.filename,
                contentType: req.file.mimetype
            }
        });
        await newMovie.save();
        res.status(201).json({ data: true, error: false });
    } catch (error) {
        res.status(500).json({ data: false, error: true, errMsg: error });
    }
}


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
    const { id } = req.user;
    try {
        const movies = await Movie.find({ userId: id })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const filteredMovies = movies.map(movie => {
            const { id, ...movieDataWithoutUserId } = movie.toObject();
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
