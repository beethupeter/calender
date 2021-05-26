var date = new Date();
var events = {

};

var currentDate = '';

function prevMonth() {
    date = new Date( date.getFullYear(), date.getMonth()-1,1);
    createCalander(date);
}
function nextMonth() {
    date = new Date( date.getFullYear(), date.getMonth()+1,1);
    createCalander(date);
}

function showPopUp(date) {
    document.getElementById('popup').style.display = 'block';
    currentDate = date;
    listToDo();
}
function listToDo(){

    var parentElement = document.getElementById("listItem");
    parentElement.innerHTML = "";
      
    if(events[currentDate]) {
        events[currentDate].forEach((item) => {
            var li = document.createElement("li");
            li.innerHTML = item;
            parentElement.appendChild(li);
        });
    }
}
function addItems(){
  var eventtext =  document.getElementById("eventtext").value ;
  if (events[currentDate]) {
    events[currentDate].push(eventtext);
  }
  else {
    events[currentDate] = [eventtext];
  }
  listToDo();
  document.getElementById("eventtext").value =  '';
}

function closePopup(){
    document.getElementById("popup").style.display ="none";
}

function createCalander(date){
    var array = [];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var displayMonth = monthNames[date.getMonth()] + ' ' + date.getFullYear();
    document.getElementById('displayMonthYear').innerHTML = displayMonth;

    var previousStartDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    var previousLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for(i = previousLastDate - previousStartDay ;i<= previousLastDate;i++){
        array.push({
            "day": i,
            "is_current": false,
        });

    }
    var endDate = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDate();
    for(i=1;i<=endDate;i++){
        array.push({
            "day": i,
            "is_current": true,
        });
    }
    var nextStartDay = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay();
    var numberOfDay = 6;
    for(i=1;i<=(numberOfDay - nextStartDay); i++){
        array.push({
            "day": i,
            "is_current": false,
        });
    }

    var parentElement = document.getElementById('days_list'); 
    parentElement.innerHTML = '';
    var currentParent = '';
    array.forEach((item, index) => {
        if ( index % 7 === 0) {
            if (currentParent) {
                parentElement.appendChild(currentParent);
                currentParent = '';
            }
            currentParent = document.createElement("div");
            currentParent.classList.add("flex-row");
        }
        var div = document.createElement("div");
        div.innerHTML = item.day;
        if (!item.is_current) {
            div.classList.add("outside-date");
        }
        div.onclick = function() { showPopUp(item.day) };
        currentParent.appendChild(div);
    });
    parentElement.appendChild(currentParent);
}