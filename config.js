'use strict';

exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/bragging-rights-sandbox';
exports.PORT = process.env.PORT || 3006;