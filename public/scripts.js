document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const bmiRes = document.getElementById('bmiResult');

    bmiForm.addEventListener('submit', function (event) {
        const h = parseFloat(document.getElementById('height').value);
        const w = parseFloat(document.getElementById('weight').value);
        const age = parseInt(document.getElementById('age').value);
        const gen = document.getElementById('gender').value;

        if (isNaN(h) || isNaN(w) || isNaN(age) || gen === '') {
            event.preventDefault();
            alert('Please fill fields correctly');
        }
    });
});