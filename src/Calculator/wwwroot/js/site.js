
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

var clearCounter = 0;

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        var input = document.querySelector('#top');
        var result = document.querySelector('#bottom');
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
            if (btnVal != '=') {
                input.innerHTML += btnVal;        
            }
        }

        switch (btnVal) {
            case "Clear":
                clearCounter++;
                input.innerHTML = '';
                decimalAdded = false;
                if (isGraphing) {
                    $("#inputTxtBox").val("");
                    Plot("0");
                }
                if (clearCounter > 1) {
                    console.log("delete history")
                    deleteHistory();
                    clearCounter = 0;
                }

                break;

            case "sin":
                input.innerHTML = 'sin(' + inputVal + ')';
                result = Math.sin(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "cos":
                input.innerHTML = 'cos(' + inputVal + ')';
                result = Math.cos(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "tan":
                input.innerHTML = 'tan(' + inputVal + ')';
                result = Math.tan(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "e":
                input.innerHTML = 'e^' + inputVal;
                result = Math.exp(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "ln":
                input.innerHTML = 'ln(' + inputVal + ')';
                result = Math.log(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "%":
                input.innerHTML = inputVal + '%';
                result = inputVal / 100;
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "sqrt":
                input.innerHTML = '√' + inputVal;
                result = Math.sqrt(inputVal);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "x^2":
                input.innerHTML = inputVal + '^2';
                result = Math.pow(inputVal, 2);
                displayHistory(input.innerHTML, result);
                input.innerHTML = "";
                break;

            case "=":
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                    equation = equation.replace(/.$/, '');

                if (equation) {
                    result = eval(equation);
                    input.innerHTML = "";
                    displayHistory(equation, result);
                }
                decimalAdded = false;
                //break;

            default:
                //syntax error
                break;

        }
        e.preventDefault();
    };
}


function displayHistory(equation, result) {

    var history = ["history_2", "history_3", "history_4", "history_5", "history_6",
                "history_7"];

    var currentEquation = equation;
    var currentResult = result;

    var prevEquation;
    var prevResult;

    for (var i = 0; i < history.length - 1;) {        //concatenate id
        var id1 =  history[i + 1];
        var id2 =  history[i];

        //Geting the old values
        prevEquation = document.getElementById(id1).innerHTML || " ";
        prevResult = document.getElementById(id2).innerHTML || " ";

        //set new values
        document.getElementById(id1).innerHTML = " ";
        document.getElementById(id2).innerHTML = " ";
        document.getElementById(id1).innerHTML = currentEquation || "0";
        document.getElementById(id2).innerHTML = currentResult || "0";

        currentEquation = prevEquation;
        currentResult = prevResult;

        i += 2;

    }
};

var isStandard = true;
var isGraphing = false;
var isScientific = false;
var isDeveloper = false;

function TransformCalculator(input) {
    switch (input) {
        case "standard":
            isStandard = true;
            if (isGraphing) {
                isGraphing = false;
                $('.function-plot').remove();
                $('#screen').css("background", "#263238");
                $("#numberBtns").slideDown();
                $("#graphingInput").slideUp();
            }
            if (isDeveloper) {
                isDeveloper = false;
                $("#numberBtns, #screen, #clearBtn").slideDown();
                $("#developerOptions").slideUp();
                $("#calculator").removeClass("developerClass");
            }
            $("#scientificRegion").slideUp();
            break;
        case "scientific":
            isScientific = true;
            if (isGraphing) {
                isGraphing = false;
                $('.function-plot').remove();
                $('#screen').css("background", "#263238");
                $("#numberBtns").slideDown();
                $("#graphingInput").slideUp();
            }
            if (isDeveloper) {
                isDeveloper = false;
                $("#numberBtns, #screen, #clearBtn").slideDown();
                $("#developerOptions").slideUp();
                $("#calculator").removeClass("developerClass");
            }
            $("#scientificRegion").slideDown();
            break;
        case "graphing":
            isGraphing = true;
            if (isDeveloper) {
                isDeveloper = false;
                $("#screen, #clearBtn").slideDown();
                $("#developerOptions").slideUp();
            }
            $('#screen').css("background", "white");
            $("#graphingInput").slideDown();
            $("#numberBtns, #scientificRegion").slideUp();
            break;
        case "developer":
            isDeveloper = true;
            $("#scientificRegion, #numberBtns, #screen, #clearBtn").slideUp();
            $("#calculator").addClass("developerClass");
            $("#developerOptions").slideDown();
            if (isGraphing) {
                isGraphing = false;
                $("#graphingInput").slideUp();
            }

            break;
    }

};

$("#scientific").change(function () {
    TransformCalculator("scientific");
    
});

$("#standard").change(function () {
    TransformCalculator("standard");
  
});

$("#graphing").change(function () {
    deleteHistory();
    TransformCalculator("graphing");
    var functionPlot = window.functionPlot;
    Plot("0");
});

$("#developer").change(function () {
    TransformCalculator("developer");
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


$(function () {
    $("#slider-range-max").slider({
        range: "max",
        min: 8,
        max: 24,
        value: 16,
        slide: function (event, ui) {
            $("#amount").text(ui.value);
        }
    });
    $("#amount").text($("#slider-range-max").slider("value"));
});



function deleteHistory() {

    var history = ["top","history_2", "history_3", "history_4", "history_5", "history_6",
               "history_7"];


    for (i in history) {
        document.getElementById(history[i]).innerHTML = " ";
    }
};