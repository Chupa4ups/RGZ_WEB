let topButton = document.getElementById('topButton');
topButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

let rate = 0.007;

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
.then(res => res.json())
.then(data => {
    rate = data.Valute.UZS.Value;
    drawChart();
});

function toUZS() {
    let rub = document.getElementById('rub').value;
    document.getElementById('result').innerText =
        (rub / rate).toFixed(2) + ' UZS';
}

function toRUB() {
    let uzs = document.getElementById('uzs').value;
    document.getElementById('result').innerText =
        (uzs * rate).toFixed(2) + ' RUB';
}

function drawChart() {
    let canvas = document.getElementById('chart');
    let ctx = canvas.getContext('2d');

    let values = [rate, rate*1.02, rate*0.98, rate*1.01, rate*0.99];

    let width = 50;
    let x = 50;

    values.forEach((v, i) => {
        let h = v * 1000;

        ctx.fillStyle = 'blue';
        ctx.fillRect(x, 250 - h, width, h);

        canvas.onclick = function(event) {
            let index = Math.floor((event.offsetX - 50) / 50);
            if(values[index]) {
                alert('Курс: ' + values[index]);
            }
        }

        x += 80;
    });
}