// selectors form elements
let dataSaver = document.getElementById("send");
let textBox = document.getElementById("task-text");
let textDate= document.getElementById("task-date");
let textTime = document.getElementById("task-time");
const allTasksJSON = localStorage.getItem('allTasks');

if(allTasksJSON === null){
    var myTasks = [];
    
    } else {
       // var varibale scope
    var myTasks = JSON.parse(allTasksJSON);   
    } 


// write to localStorage
const saveTasks = function(myTasks){
    localStorage.setItem('allTasks', JSON.stringify(myTasks));
}


// unique id generator
let idMaker = function(){
    return Math.random().toString(36).substr(2,9);
}

// generate task box + push to store
function saveDOM(){ 
    let box = document.createElement("li");
    box.setAttribute("id", "task-box");
    box.setAttribute("data", idMaker());
    box.className = "col col-3 list-inline-item mt-1 animated fadeIn";

	let boxDel = document.createElement("span");
    boxDel.setAttribute("id", "tb-delete");
    boxDel.className = "glyphicon glyphicon-remove";

    let boxMsg = document.createElement("span");
    boxMsg.setAttribute("id","tb-msg");
    boxMsg.className = "read-data msg";
    
    let boxDate = document.createElement("span");
    boxDate.setAttribute("id","tb-date");
    boxDate.className = "read-data date";

    let boxTime = document.createElement("span");
    boxTime.setAttribute("id","tb-time");
    boxTime.className = "read-data time";

	let d = new Date();
	let dh = d.getHours();
  	let dm = d.getMinutes();
      let ds = d.getSeconds();
      // required fields alert
    if(textBox.value == "" || textDate.value == ""){
         alert("Message and Date are Required Fields");
         let emptyVal = document.getElementsByTagName('input').value == "";
    }  else {
        myTasks.push(
            {
                id: box.getAttribute('data'),
                text: textBox.value,
                date: textDate.value,
                time: textTime.value
            });
            saveTasks(myTasks);
    
    boxMsg.textContent = textBox.value;
    boxDate.textContent = textDate.value;
    boxTime.textContent = textTime.value;
    

    document.querySelector('#results').appendChild(box);
    box.appendChild(boxDel);
    box.appendChild(boxMsg);
    box.appendChild(boxTime);
    box.appendChild(boxDate);
    return box;
    }
    
}

// submit button action to generate DOM for task and save it
dataSaver.addEventListener("click", function (e) {
    saveDOM();
});


myTasks.forEach(function (task) {
    let box = document.createElement("li");
    box.setAttribute("id", "task-box");
    box.setAttribute("data", task.id)
    box.className = "col col-3 list-inline-item mt-1";

    let boxDel = document.createElement("span");
    boxDel.setAttribute("id", "tb-delete");
    boxDel.className = "glyphicon glyphicon-remove";

    let boxMsg = document.createElement("span");
    boxMsg.setAttribute("id", "tb-msg");
    boxMsg.className = "read-data msg";

    let boxDate = document.createElement("span");
    boxDate.setAttribute("id", "tb-date");
    boxDate.className = "read-data date";

    let boxTime = document.createElement("span");
    boxTime.setAttribute("id", "tb-time");
    boxTime.className = "read-data time";
    document.querySelector('#results').appendChild(box);

    boxMsg.textContent = task.text;
    boxDate.textContent = task.date;
    boxTime.textContent = task.time;


    box.appendChild(boxDel);
    box.appendChild(boxMsg);
    box.appendChild(boxTime);
    box.appendChild(boxDate);
});




// target dynamic element event through the document body selector
document.body.addEventListener('click', function (e) {
    if (e.srcElement.id == 'tb-delete') {
        for (let i = 0; i < myTasks.length; i++) {
            document.body.getElementsByClassName('glyphicon-remove')[i].addEventListener('click', function (e) {
                // target the delete-span parent
                let parentTask = e.target.parentElement.attributes.data.value;
                // check if data attribute the same as array element id in LocalStorage and splice it off
                if (parentTask === myTasks[i].id) {
                    myTasks.splice(i, 1);
                };
                // save the array of tasks and remove from DOM
                saveTasks(myTasks);
                e.target.parentElement.remove();
            });
        };
    };
});






// clear form
document.getElementById('clear').addEventListener("click", function (e) {
    textBox.value = "";
    textDate.value = "";
    textTime.value = "";
});
// reset app
document.getElementById('reset').addEventListener("click", function (e) {
    textBox.value = "";
    textDate.value = "";
    textTime.value = "";
    localStorage.clear();
    window.location.reload();
});
