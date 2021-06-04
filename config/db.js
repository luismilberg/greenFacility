const mongoose = require('mongoose');
// const uri = `mongodb+srv://web:Ywf5AezeeIey7DxA@cluster0.wuqka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const uri = process.env.DB;
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