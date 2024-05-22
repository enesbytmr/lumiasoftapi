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

        const filePath = path.join(__dirname, 'downloaded.pdf');
        fs.writeFileSync(filePath, response.data);

        res.download(filePath, 'downloaded.pdf', (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).send('Error sending the file');
            }
            // Optionally delete the file after sending it
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error downloading the file:', error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
