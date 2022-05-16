//Select the elements
const clear = document.querySelector(".clear");

const dateElement = document.getElementById("date");
const list = document.querySelector("#list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST=[], id=0;

// Show todays date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-IN",options);

// add to do function

function addToDo(toDo, id, done, trash){

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job = "delete" id="${id}"></i>
    </li>
    `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list when user hit enter key
input.addEventListener("keyup",  (event) => {
        if (event.key === "Enter") {
            const toDo = input.value;

            // if the input isn't empty
            if (toDo) {
                addToDo(toDo, id, false, false);

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });
                input.value = "";
            }
            id++;
        }
    });

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);    

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", (e) =>{
    const element = e.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if(elementJob == "delete"){
        removeToDo(element);
    }
});