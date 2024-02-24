// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { saveLoan, getLoan, updateInstallment } = require('./loan.js');
const cors = require('cors')
// Connect to MongoDB
app.use(cors());

// Define a mongoose schema for your data


const app = express();

app.use(bodyParser.json());

// Define a route to handle storing data
app.post('/api/save-loan',saveLoan )
app.get('/api/get-loan',getLoan )
app.post('/api/update-installemt',updateInstallment )




const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
  try {
    await mongoose.connect('mongodb+srv://pavankumar:pavankumar@cluster0.bp4iokt.mongodb.net/loandb', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected");
    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.log("error in db connection",error);
  }
});
