const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // CORS ayarları ekleniyor

// GET İsteğini Karşılayan Endpoint
app.get('/download-pdf', async (req, res) => {
    try {
        const response = await axios.get('http://amzn-gift-message.eastus.azurecontainer.io/download-pdf');

        res.status(response.status).json({ message: 'GET request sent successfully', data: response.data });
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

// POST İsteğini Karşılayan Endpoint
app.post('/create-pdf', async (req, res) => {
    try {
        const { receiver, order_number, gift_message } = req.body;

        const response = await axios.post('http://amzn-gift-message.eastus.azurecontainer.io/create-pdf', {
            receiver,
            order_number,
            gift_message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
