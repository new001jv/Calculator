var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        var input = document.querySelector('#top');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length - 1];

            if (inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;

            else if (inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;

            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        }

        else if (btnVal == '.') {
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }

        else {
            input.innerHTML += btnVal;
        }

        switch (btnVal) {
            case "Clear":
                input.innerHTML = '';
                decimalAdded = false;
                break;

            case "sin":
                input.innerHTML = Math.sin(inputVal);
                break;

            case "cos":
                input.innerHTML = Math.cos(inputVal);
                break;

            case "tan":
                input.innerHTML = Math.tan(inputVal);
                break;

            case "e":
                input.innerHTML = Math.exp(inputVal);
                break;

            case "ln":
                input.innerHTML = Math.log(inputVal);
                break;

            case "%":
                input.innerHTML = inputVal / 100;
                break;

            case "sqrt":
                input.innerHTML = Math.sqrt(inputVal);
                break;

            case "x^2":
                input.innerHTML = Math.pow(inputVal,2);
                break;

            case "=":
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                    equation = equation.replace(/.$/, '');

                if (equation)
                    input.innerHTML = eval(equation);

                decimalAdded = false;
                break;

            default:
                //syntax error
                break;

            }


        e.preventDefault();
    };
}


$("#scientific").change(function () {
    $("#scientificRegion").slideDown();
});

$("#standard").change(function () {
    $("#scientificRegion").slideUp();
});


$("#graphing").change(function () {
    functionPlot({
        target: '#screen',
        data: [{
            fn: 'x^2',
            derivative: {
                fn: '2x',
                updateOnMouseMove: true
            }
        }]
    })
});

