const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;

mongoose.connect(config.db, {useMongoClient: true}).then( res => {
  console.log('Connected to the database!')
}, err => console.log('Error to connect to the database!', err));
