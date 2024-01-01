const express = require('express');
const router = express.Router();
const moment = require('moment');
const path = require('path');

const bmiHistory = [];

const calculateBMI = (height, weight, age, gender, unit) => {
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);
    const numAge = parseInt(age);

    let bmi;
    if (unit === 'metric') {
        bmi = numWeight / Math.pow(numHeight / 100, 2);
    }
    else {
        bmi = (numWeight/ Math.pow(numHeight,2)) * 703;
    }

    let category;
    if (gender === 'female') {
        if (numAge < 19) {
            if (bmi < 16.5) {
                category = 'Underweight';
            }
            else if (bmi >= 16.5 && bmi < 21.5) {
                category = 'Normal Weight';
            }
            else if (bmi >= 21.5 && bmi < 29.5) {
                category = 'Overweight';
            }
            else if (bmi >=29.5 && bmi < 36) {
                category = 'Severe overweight'
            }
            else {
                category = 'Obesity';
            }

        }
        else if (numAge >= 19 && numAge <=65) {
            if (bmi < 17.5) {
                category = 'Underweight';
            }
            else if (bmi >= 17.5 && bmi < 24) {
                category = 'Normal Weight';
            }
            else if (bmi >= 24 && bmi < 29) {
                category = 'Overweight';
            }
            else if (bmi >=29 && bmi <34) {
                category = 'Severe overweight'
            }
            else {
                category = 'Obesity';
            }
        }
    }
    else {
        if (numAge < 19 ) {
            if (bmi < 17.5) {
                category = 'Underweight';
            }
            else if (bmi >= 18.5 && bmi < 22) {
                category = 'Normal Weight';
            }
            else if (bmi >= 22 && bmi < 29.5) {
                category = 'Overweight';
            }
            else if (bmi >=29.5 && bmi < 35) {
                category = 'Severe overweight'
            }
            else {
                category = 'Obesity';
            }

        }
        else if (numAge >= 19 && numAge <=65) {
            if (bmi < 18.5) {
                category = 'Underweight';
            }
            else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal Weight';
            }
            else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
            }
            else if (bmi >=30 && bmi < 35) {
                category = 'Severe overweight'
            }
            else {
                category = 'Obesity';
            }
        }
    }
    return `BMI calculation - BMI: ${bmi.toFixed(2)}, Category: ${category}, Age: ${age}, Gender: ${gender}, Unit: ${unit}`;
};

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));

});

router.route('/bmicalculator').get((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}).post((req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const age = parseInt(req.body.age);
    const gender = req.body.gender;
    const unit = req.body.unit;

    const bmiResult = calculateBMI(height, weight, age, gender, unit);
    
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    bmiHistory.push({ timestamp, result: bmiResult} );

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <title>BMI Calculator Result</title>
    </head>
    <body class="bg-light">
      <div class="container mt-5">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">BMI Result</h2>
            <p class="card-text"><strong>${bmiResult}</strong></p>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});


// router.get('/history', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'history.html'));
    
//   });

router.get('/history', (req, res) => {
    const historyHtml = generateHistoryHtml(); 
    res.send(historyHtml);
});

  function generateHistoryHtml() {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            <title>History</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/bmicalculator">BMI Calculator</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/history">History</a>
                    </li>
                </ul>
            </nav>

            <div class="container mt-4">
                <h2>History of BMI Calculations</h2>
                <ul class="list-group">`;

    bmiHistory.forEach(entry => {
        html += `<li class="list-group-item">${moment(entry.timestamp).format('YYYY-MM-DD HH:mm:ss')} - ${entry.result}</li>`;
    });

    html += `
                </ul>
            </div>

            <footer class="mt-5">
                <p class="text-center">Nargiz | SE-2204</p>
            </footer>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <script src="/public/scripts.js"></script>
        </body>
        </html>`;

    return html;
}
module.exports = router;

