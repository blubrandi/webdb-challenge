
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/projects.db3',
    },
    useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

// list all roles
server.get('/api/projects', async (req, res) => {

    try {
        const projects = await db('projects');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
});


const errors = {
    '19': 'Another record with that value exists',
};

// create roles
server.post('/api/projects', async (req, res) => {
    try {
        const [id] = await db('projects').insert(req.body);

        const role = await db('projects')
            .where({ id })
            .first();

        res.status(201).json(role);
    } catch (error) {
        const message = errors[error.errno] || 'We ran into an error';
        res.status(500).json({ message, error });
    }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
);
