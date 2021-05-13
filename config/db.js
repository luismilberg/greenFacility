const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/greenFacility';

const db = mongoose.connection;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

db.once('open', _ => {
    console.log('Database is connected to: ', uri);
})
    .catch( err => {
        console.log(err);
    });

db.on('error', err => {
    console.log(err);
});