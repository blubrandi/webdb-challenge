const express = require('express');

const helmet = require('helmet');

const projectsRouter = require('../projects/projectsRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);


server.get('/', (req, res) => {
    res.status(200).json({ message: 'Yo!  Projects!' });
});

module.exports = server;