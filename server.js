const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'multimedia_portfolio',
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database.');
    }
});

// API endpoint to add a project
app.post('/api/projects', (req, res) => {
    const { title, description, imageUrl, link } = req.body;
    
    const query = 'INSERT INTO projects (title, description, imageUrl, link) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, filaPath], (err, result) => {
        if (err) {
            console.error('Error saving to database:', err);
            res.status(500).send('Error saving to database');
        } else {
            res.status(200).send('Project added successfully');
        }
    });
})

// API endpoint to fetch all projects
app.get('/projects', (rew, res ) => {
    const query = 'SELECT * FROM projects ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).send('Error fetching projects');
        } else {
            res.status(200).json(results);
        }
    });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
)