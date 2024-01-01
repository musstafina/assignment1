const express = require('express');
const bodyParser = require('body-parser');
const bmiRoutes = require('./routes/bmiRoutes');


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', bmiRoutes);

app.get('/public/scripts.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/public/scripts.js');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});