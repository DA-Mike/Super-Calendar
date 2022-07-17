var calendarObj = {date:"" , time:"" , text:""};
var today = moment().format("[Today is ] dddd, MMMM Do YYYY, h:mm");
var textAreaEl = document.getElementsByClassName("text-area");
var now = moment().format("HH");
var saveEl = document.getElementsByClassName("saveBtn");

$("#currentDay").text(today);

function timeSlide() {
    var timeEl = document.querySelectorAll('tr');
    // console.log(timeEl);
    for (i = 0; i < timeEl.length; i++){
        var convertTime = moment(timeEl[i].children[0].textContent, 'ha').format('HH');
        // console.log("timeEl child: ", timeEl[i].children[0]);
        // console.log("convertTime: ", convertTime);
        if (convertTime < now) {
            $(timeEl[i].children[1]).addClass("past");
        } else if (convertTime > now) {
            $(timeEl[i].children[1]).addClass("future");
        } else {
            $(timeEl[i].children[1]).addClass("present");
        }
    }
}

function saveText(event) {
    var dayObj = {date:"", item:""};
    // console.log("parent: ", $(this).parent().children()[1].children[0].value);
    var newText = $(this).parent().children()[1].children[1].value;
    
    $(this).parent().children()[1].children[1].remove();
    $(this).parent().children()[1].children[0].remove();
    $(this).parent().children()[1].textContent = newText;

    // var newText = $parentEl.children[1].children[0].value;
    console.log("newText: ", newText);
}

$(saveEl).on('click', saveText);

timeSlide();

console.log(textAreaEl);




$(document).on('click', '.text-area', function() {
    var classList = $(this).attr("class");
    console.log(classList);
    var $textInput = $('<textarea class="form-control"' + classList + '></textarea>');
    var $form = $('<td class="text-area form-group past"></td>');
        // $input   = $('<input type="text">');

    // Place the original element inside a wrapper:
    // $(this).before($input);
    $(this).before($form);
    $(this).remove().appendTo($form).hide();
    // $(this).text.remove();

    // $(this).append($textInput);
    // $(this).hide();

    // Add some styles:
    $textInput.css({
        display: 'block',
        width: '100%',
        height: '100%',
        font:  $(this).css('font'),
        color: 'black'
    });
    $textInput.css("background-color", "transparent");

    // Build up the form:
    $form.append($textInput);
    // $(this).append($input);
    $textInput.val($(this).text()).focus();
    console.log("focus: ", $textInput.val($(this).text()));
});

$(".text-area").change(function(){
    console.log("change called");
})

$(document).on('submit', '.form-control', function(e) {
    // Don't actually submit the form:
    console.log("submit called");
    e.preventDefault();

    var val       = $(this).find('input').val();
        $wrapper  = $(this).parent(),
        $original = $wrapper.children().first();
        // $original = $(this).children.first();

    // Use text() instead of html() to prevent unwanted effects.
    // $original.text(val);
    $wrapper.text(val)
    $original.remove();
    // $wrapper.after($original);
    // $original.show();
    // $wrapper.remove();   
});

