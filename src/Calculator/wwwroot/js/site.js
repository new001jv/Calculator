
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;
for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        var input = document.querySelector('#top');
        var bottomInput = document.querySelector('#bottom');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        if (bottomInput.innerHTML != '') {
            inputVal = bottomInput.innerHTML;
            input.innerHTML = bottomInput.innerHTML;
            bottomInput.innerHTML = '';
        }

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
            if (btnVal != '=') {
                input.innerHTML += btnVal;        
            }
        }

        switch (btnVal) {
            case "Clear":
                input.innerHTML = '';
                bottomInput.innerHTML = '';
                decimalAdded = false;
                if (isGraphing) {
                    $("#inputTxtBox").val("");
                    Plot("0");
                }
                break;

            case "sin":
                input.innerHTML = 'sin(' + inputVal + ')';
                bottomInput.innerHTML = Math.sin(inputVal);
                break;

            case "cos":
                input.innerHTML = 'cos(' + inputVal + ')';
                bottomInput.innerHTML = Math.cos(inputVal);
                break;

            case "tan":
                input.innerHTML = 'tan(' + inputVal + ')';
                bottomInput.innerHTML = Math.tan(inputVal);
                break;

            case "e":
                input.innerHTML = 'e^' + inputVal;
                bottomInput.innerHTML = Math.exp(inputVal);
                break;

            case "ln":
                input.innerHTML = 'ln(' + inputVal + ')';
                bottomInput.innerHTML = Math.log(inputVal);
                break;

            case "%":
                input.innerHTML = inputVal + '%';
                bottomInput.innerHTML = inputVal / 100;
                break;

            case "sqrt":
                input.innerHTML = '√' + inputVal;
                bottomInput.innerHTML = Math.sqrt(inputVal);
                break;

            case "x^2":
                input.innerHTML = inputVal + '^2';
                bottomInput.innerHTML = Math.pow(inputVal,2);
                break;

            case "=":
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                    equation = equation.replace(/.$/, '');

                if (equation)
                    bottomInput.innerHTML = eval(equation);

                decimalAdded = false;
                //break;

            default:
                //syntax error
                break;

            }


        e.preventDefault();
    };
}


var isGraphing = false;
var isScientific = false;

$("#scientific").change(function () {

    if (isGraphing) {
        isGraphing = false;
        $('.function-plot').remove();
        $('#screen').css("background", "#263238");
        $("#numberBtns").slideDown();
        $("#graphingInput").slideUp();
    }
    $("#scientificRegion").slideDown();
});

$("#standard").change(function () {
    
    if (isGraphing) {
        isGraphing = false;
        $('.function-plot').remove();
        $('#screen').css("background", "#263238");
        $("#numberBtns").slideDown();
        $("#graphingInput").slideUp();
    }

    $("#scientificRegion").slideUp();
});



$("#graphing").change(function () {

    isGraphing = true;
    var functionPlot = window.functionPlot;
    $('#screen').css("background", "white");
    $("#graphingInput").slideDown();
    $("#numberBtns, #scientificRegion").slideUp();
    Plot("0");
});


$("#graphingInput").keypress(function (event) {
    if (event.which == 13) {
       var input = $("#inputTxtBox").val() || 0;
       Plot(input);
    }
});

function Plot(input) {
    functionPlot({
        width: 300,
        height: 250,
        target: '#screen',
        yAxis: { domain: [-3, 3] },
        tip: {
            renderer: function () { }
        },
        grid: true,
        data: [{
            fn: input,

        }]
    });
};