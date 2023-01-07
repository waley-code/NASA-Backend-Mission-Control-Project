const PATH = require('path');

const express = require('express');

const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router.js');

const launchesRouter = require('./routes/launches/launches.router.js')

const morgan = require('morgan');

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(PATH.join(__dirname, "..", "public")))

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

module.exports = app;