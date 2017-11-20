const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {UserMongoose} = require('./models/user');

const state = {
    db: null,
}

if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb://siestaderek:SpearFish1990!@ds127842.mlab.com:27842/wyroo'
}

exports.connect = function(done) {
    if (state.db) {
        return done();
    }

    mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;

    db.on('error', function(error) {
        console.log(error)
        return done(error);
    });
    db.once('open', function() {

        console.log('we\'re connected')

        state.db = db;
        done();
    })
}

exports.get = function() {
    return state.db;
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        })
    }
}