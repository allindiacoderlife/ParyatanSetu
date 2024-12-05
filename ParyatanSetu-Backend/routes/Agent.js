const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/webhook', (req, res) => {
    const data = req.body;

    axios.post('https://white728.app.n8n.cloud/webhook/webhook', data)
        .then(response => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(error.response ? error.response.status : 500).send(error.message);
        });
});

module.exports = router;