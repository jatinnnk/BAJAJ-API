const express = require('express');
const bodyParser = require('body-parser');
const bfhl = require('./api/bfhl');
const health = require('./api/health');

const app = express();
app.use(bodyParser.json());

// Mock Vercel req/res objects if needed, but Express is mostly compatible
app.all('/api/bfhl', bfhl);
app.all('/api/health', health);
app.get('/health', health); // Map root /health too

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});
