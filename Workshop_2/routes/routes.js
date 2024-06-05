const express = require('express');


const router = express.Router()
router.use(express.json());
module.exports = router;

// GET /hello route
router.get('/hello', (req, res) => {
    const message = req.query.message || 'World';
    res.json({ response: `Hello ${message}` });
});

// POST /user route
router.post('/user', (req, res) => {
    const { name, lastname } = req.body;
    res.json({ response: `El usuario ${name} ${lastname} fue creado` });
});