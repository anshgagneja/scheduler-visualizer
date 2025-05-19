// backend/index.js
const express = require('express');
const cors = require('cors');
const schedulerRouter = require('./routes/scheduler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/simulate', schedulerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
