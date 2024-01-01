const express = require('express');
const router = express.Router();
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
    
    const timestamp = new Date().toLocaleString();
    bmiHistory.push({ timestamp, result: bmiResult} );

    res.send(bmiResult);
});

router.get('/history', (req, res) => {
    let hist ='<h1> BMI History</h1>';
    bmiHistory.forEach(element => {
        hist += `<p>${element.timestamp}: ${element.result}</p>`;
    });
    res.send(hist);

});

module.exports = router;

