const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.wuqka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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