//set variables
var today = moment().format("[Today is ] dddd, MMMM Do YYYY, h:mm");
var textAreaEl = document.getElementsByClassName("text-area");
var now = moment().format("HH");
var saveEl = document.getElementsByClassName("saveBtn");
var calendarItems = [];
var timeEl = document.querySelectorAll('tr');
var stripped = [];

//get today
$("#currentDay").text(today);

//creates reference array for time based on calendar row time headers
function helper() {
    for (n = 0; n < timeEl.length; n++){
        stripped.push(timeEl[n].children[0].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
    }
    return stripped;
}

function timeSlide() {
    var timeEl = document.querySelectorAll('tr');
    for (i = 0; i < timeEl.length; i++){
        var convertTime = moment(timeEl[i].children[0].textContent, 'ha').format('HH');
        if (convertTime < now) {
            $(timeEl[i].children[1]).addClass("past");
        } else if (convertTime > now) {
            $(timeEl[i].children[1]).addClass("future");
        } else {
            $(timeEl[i].children[1]).addClass("present");
        }
    }
}

//saves text input
function saveText(event) {
    var calendarObj = {date:"", item:[]};
    var itemObj = {time:"" , text:""};
    var todayDate = moment().format('DD-MM-YYYY');
    var timeDay = $(this).parent().children()[0].textContent;
    var newText = $(this).parent().children()[1].children[1].value;

    itemObj.time = timeDay;
    itemObj.text = newText;

    var localCheck = JSON.parse(localStorage.getItem("calendar-items"));
    //checks if there's local data
    if (localCheck == null){
        calendarObj.date = todayDate;
        calendarObj.item.push(itemObj);
        calendarItems.push(calendarObj);
    } else if (localCheck.length > 0) {
        calendarItems = JSON.parse(localStorage.getItem("calendar-items"));
        for (i = 0; i < localCheck.length; i++){
            //checks if calendarItems already has an object for that date
            if (calendarItems[i].date === todayDate){
                for (x = 0; x < calendarItems[i].item.length; x++){
                    if (calendarItems[i].item[x].time === itemObj.time) {
                        calendarItems[i].item[x].text = itemObj.text;
                    } 
                }
            }
        }
    }
    localStorage.setItem("calendar-items", JSON.stringify(calendarItems));
    
    $(this).parent().children()[1].children[1].remove();
    $(this).parent().children()[1].children[0].remove();
    $(this).parent().children()[1].textContent = newText;
}

//listener for text input elements of calendar
$(document).on('click', '.text-area', function() {
    var classList = $(this).attr("class");
    var $textInput = $('<textarea class="form-control ' + classList + '"></textarea>');
    var $form = $('<td class="form-group ' + classList + '"></td>');
        ;
    $(this).before($form);
    $(this).remove().appendTo($form).hide();
    
    // Add some styles:
    $textInput.css({
        display: 'block',
        width: '100%',
        height: '100%',
        font:  $(this).css('font'),
        color: 'black',
    });
    $textInput.css("background-color", "transparent");
    $textInput.css("border", "none");

    // Build up the form:
    $form.append($textInput);
    $textInput.val($(this).text()).focus();
});

//initializes data on page load/reload
function init() {
    // helper();
    var calendarObj = {date:"", item:[]};
    var localCheck = JSON.parse(localStorage.getItem("calendar-items"));
    var todayDate = moment().format('DD-MM-YYYY');
    //if no calendar object, create one for today
    if (localCheck === null){
        for (z = 0; z < stripped.length; z++){
            var itemObj = {time:"" , text:""};
            itemObj.time = stripped[z];
            calendarObj.item.push(itemObj);
            calendarObj.date = todayDate;
        }
        calendarItems.push(calendarObj)
        localStorage.setItem("calendar-items", JSON.stringify(calendarItems));
    } else { //calendar object found
        for (i = 0; i < localCheck.length; i++){
            if (localCheck[i].date === todayDate){
                calendarItems = localCheck[i];
            }
        }
        //finds and appends stored data for relevant date and time
        for (i = 0; i < calendarItems.item.length; i++){
            for (n = 0; n < stripped.length; n++){
                if (calendarItems.item[i].time === stripped[n]){
                    $(timeEl[n]).children()[1].append(calendarItems.item[i].text + " ");
                }
            }
        }
    }
}

//Activate save buttons, run time styling, initialize page data
$(saveEl).on('click', saveText);
timeSlide();
helper();
init();