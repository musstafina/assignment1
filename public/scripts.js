document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const bmiRes = document.getElementById('bmiResult');

    bmiForm.addEventListener('submit', function (event) {
        const h = parseFloat(document.getElementById('height').value);
        const w = parseFloat(document.getElementById('weight').value);
        const age = parseInt(document.getElementById('age').value);
        const gen = document.getElementById('gender').value;
        const unit = document.getElementById('unit').value;


        if (isNaN(h) || isNaN(w) || isNaN(age) || gen === '') {
            event.preventDefault();
            alert('Please fill fields correctly');
        }
    });

    document.getElementById("unit").onchange = function() {
        updateLabels();
    };
    
    function updateLabels() {
        var unit = document.getElementById("unit").value;
        var heightLabel = document.getElementById("heightLabel");
        var weightLabel = document.getElementById("weightLabel");
    
        if (unit === "metric") {
            heightLabel.textContent = "Height (cm):";
            weightLabel.textContent = "Weight (kg):";
        } else {
            heightLabel.textContent = "Height (in):";
            weightLabel.textContent = "Weight (lb):";
        }
    }
    updateLabels();
});
