var body = document.body,
    html = document.documentElement;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
;
function degToRad(deg){
    var mult = Math.PI/180;
    return deg*mult;
}

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function makeHand(centerX, centerY, radius, passed, total, color){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, degToRad(270),degToRad(passed*(360/total)-90));
    ctx.strokeStyle = color;
    ctx.stroke();
}

function render(){
    var height = window.innerHeight;
    var width = window.innerWidth;

    var lineWidth = width/123;

    var centerX = width/2;
    var centerY = height/2;

    var current = new Date();
    var hour = current.getHours();
    var minute = current.getMinutes();
    var second = current.getSeconds();
    var milSec = current.getMilliseconds();
    var day = current.getDate();
    var month = current.getMonth();
    var year = current.getFullYear();
    var dayOfWeek = current.getDay();

    ctx.lineWidth = lineWidth;
    ctx.font = "30px Arial";

    var getDaysInMonth = function(month,year) {
       return new Date(year, month, 0).getDate();
    };

    var totalDaysInYear = function(year){
        total = 0;
        for(i = 0;i<12;i++){
            total += getDaysInMonth(i,year);
        }
        return total;
    };

    var daysTillNow = function(month,year){
        var total = 0;
        for(i=0;i<month;i++){
            total += getDaysInMonth(i,year);
        }
        return total;
    };

    var totalDays = totalDaysInYear(year);
    var totalHours = 24*getDaysInMonth(month,year);
    var accSec = second+(milSec/1000);
    var accDay = (day) +(hour/240);
    var accTotHours = (day-1)*24 +(hour)+(minute/60)+(accSec/600);
    var accDoW = dayOfWeek+(hour/24)+(minute/600);
    var accMin = minute + (accSec/60);
    var dayOfYear = daysTillNow(month,year) + day;

    //Fill Rectangle
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,width,height);

    //Year Transitions
    makeHand(centerX, centerY, width/80, dayOfYear, totalDays, "#F71735");
    //Day Transitions
    makeHand(centerX, centerY, width/32, accTotHours, totalHours, '#404E5C');
    //Week Transitions
    makeHand(centerX, centerY, width/20, accDoW, 7, '#44BBA4');
    //Hour Transitions
    makeHand(centerX, centerY, width/13.35, hour, 24, '#3F88C5');
    //Minute Transitions
    makeHand(centerX, centerY, width/10.68, accMin, 60, '#E94F37');
    //Second Transitions
    makeHand(centerX, centerY, width/8.9, accSec, 60, '#393E41');
    console.log(width);
}

setInterval(render, 10);