
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

server.get('/api/projects/:id', async (req, res) => {
    try {
        const projects = await db('projects').where({ id: req.params.id });
        const actions = await db('actions').where({ project_id: req.params.id });
        if (projects.length) {
            const project = projects[0];
            res.status(200).json({ ...project, actions });
        } else {
            res
                .status(404)
                .json({ message: 'Project cannot be found' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'There was an error retrieving your project',
            error
        });
    }
});


const errors = {
    '19': 'Another record with that value exists',
};

server.post('/api/projects', async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            message:
                'Please add a project name and description'
        });
    }
    try {
        const project = await db('projects').insert(req.body);
        if (project) {
            res
                .status(200)
                .json({ message: 'Project created successfully.', project });
        } else {
            res
                .status(404)
                .json({ message: 'We could not add your project' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'We could not add your project',
            error
        });
    }
});

server.post('/api/actions', async (req, res) => {
    if (
        !req.body.description ||
        !req.body.notes ||
        !req.body.project_id
    ) {
        return res.status(400).json({
            message:
                'Please provide all necessary info'
        });
    }
    try {
        const action = await db('actions').insert(req.body);
        if (action) {
            res.status(200).json({
                message: 'Action created',
            });
        } else {
            res
                .status(404)
                .json({ message: 'This action cannot be added.' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'There was an error adding your action.',
            error
        });
    }
})

const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`\n** API running on http://localhost:${port} **\n`)
);
