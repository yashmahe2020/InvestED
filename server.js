const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Add middleware to parse JSON body in POST requests
app.use(express.json());  // <-- Add this line

// Serve static files (HTML, CSS, JS, images, etc.) from the root directory
app.use(express.static(path.join(__dirname)));

// Route for serving the default index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route for other HTML pages
app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, `${page}.html`));
});

// API endpoint for interacting with OpenAI
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    const message = `${userMessage}\n Please keep your response simple and concise.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            }),
        });

        const data = await response.json();
        res.json({ botMessage: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
