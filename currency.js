let rate = 0;

fetch('https://www.cbr-xml-daily.ru/daily_json.js')

.then(function(response) {

    return response.json();

})

.then(function(data) {

    let uzs = data.Valute.UZS;

    rate = uzs.Value / uzs.Nominal;

    console.log(rate);

    drawChart();
});

function toUZS() {

    if(rate == 0) {

        alert('Курс валют ещё не загрузился');

        return;
    }

    let rub = Number(
        document.getElementById('rub').value
    );

    let result = rub / rate;

    document.getElementById('result').innerHTML =
        result.toFixed(2) + ' UZS';
}

function toRUB() {

    if(rate == 0) {

        alert('Курс валют ещё не загрузился');

        return;
    }

    let uzs = Number(
        document.getElementById('uzs').value
    );

    let result = uzs * rate;

    document.getElementById('result').innerHTML =
        result.toFixed(2) + ' RUB';
}

function drawChart() {

    let canvas = document.getElementById('chart');

    let ctx = canvas.getContext('2d');

    let values = [
        rate * 0.95,
        rate * 0.98,
        rate,
        rate * 1.02,
        rate * 1.05
    ];

    let dates = [
        '01.05',
        '02.05',
        '03.05',
        '04.05',
        '05.05'
    ];

    let x = 50;

    for(let i = 0; i < values.length; i++) {

        let height = values[i] * 30000;

        ctx.fillStyle = 'blue';

        ctx.fillRect(
            x,
            250 - height,
            50,
            height
        );

        ctx.fillStyle = 'black';

        ctx.fillText(dates[i], x, 270);

        x += 80;
    }

    canvas.onclick = function(event) {

        let index =
            Math.floor((event.offsetX - 50) / 80);

        if(values[index]) {

            alert(
                'Дата: ' + dates[index] +
                '\\nКурс: ' +
                values[index].toFixed(5)
            );
        }
    }
}
