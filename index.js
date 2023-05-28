const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const Models = require("./mongodb/index.js");

const RouterFns = require('./routes/index');

const app = express();
const router = express.Router();

RouterFns.forEach((routerFn, index) => {
    routerFn(router);
})

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: '1mb'
}))


app.get('/test', async (req, res) => {
    res.json({
        test: "successful", createAt: new Date().toUTCString()
    })
})

app.use("/api", router);

mongoose.connect('mongodb://localhost:27017/redis?retryWrites=true&w=majority')
    .then(() => {
        console.log("mongo ok")
    }).catch(err => {
    console.log(err)
});

app.listen(3005, () => {
    console.log('express sunucusu 3005. port üzerinde çalışıyor')
})