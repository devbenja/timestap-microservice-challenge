const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {

    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        
        date = new Date();

    } else {
        
        if (!isNaN(dateParam)) {
            dateParam = parseInt(dateParam);
        }

        date = new Date(dateParam);

    }

    if (date.toString() === 'Invalid Date') {
        
        res.json({ error: 'Invalid Date' });

    } else {
       
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });

    }

});

app.listen(3000, () => {
    console.log('Your App is Listening on Port:', 3000);
});