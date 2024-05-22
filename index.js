const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // path modülünü import ediyoruz
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // CORS ayarları ekleniyor

// GET İsteğini Karşılayan Endpoint
app.get('/download-pdf', async (req, res) => {
    try {
        const response = await axios.get('http://amzn-gift-message.eastus.azurecontainer.io/download-pdf', {
            responseType: 'arraybuffer'
        });

        res.setHeader('Content-Disposition', 'attachment; filename=downloaded.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(response.data);
    } catch (error) {
        console.error('Error downloading the file:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
