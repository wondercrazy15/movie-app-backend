const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'DELETE',
        'PUT'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

module.exports = { corsOpts }