
////////functions//////functions//////////functions///////////functions/////////////functions////////////////////////////////////////////////////
//corrent time function
function today() {
    let currentDate = new Date();
    let dateTime = currentDate.getDate() + "/"
        + (currentDate.getMonth() + 1) + "/"
        + currentDate.getFullYear() + " <br> "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds();
    return dateTime;
}
//validations for to do list inputs
function validations() {
    let missionTitle = document.getElementById("missionTitle");
    let missionDescription = document.getElementById("missionDescription");
    let missionDate = document.getElementById("missionDate");
    let missionTime = document.getElementById("missionTime");
    let detailsParagraph = document.getElementById("detailsParagraph");

    //Default input style
    missionTitle.style.backgroundColor = "";
    missionDescription.style.backgroundColor = "";
    missionDate.style.backgroundColor = "";
    missionTime.style.backgroundColor = "";
    detailsParagraph.innerHTML = "";


    if (missionTitle.value == "") {
        alert("Missing title.");
        missionTitle.style.backgroundColor = "pink";
        return 1;
    }

    if (missionDescription.value == "") {
        alert("Missing Description.");
        missionDescription.style.backgroundColor = "pink";
        return 1;
    }

    if (missionDate.value == "") {
        alert("Missing date.");
        missionDate.style.backgroundColor = "pink";
        return 1;
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (missionTitle.value == localStorage.key(i)) {
            alert("This title is already in use.")
            missionTitle.style.backgroundColor = "pink";
            return 1;
        }
    }
}



//get the details from the inputs and put them at the local storage function
function getDetails() {

    //validations
    if (validations() == 1) {
        return;
    }


    let missionName = document.getElementById("missionTitle");
    let miisionDescription = document.getElementById("missionDescription");
    let missionDate = document.getElementById("missionDate");
    let missionTime = document.getElementById("missionTime");
    let thisTime = today();
    let activity = {
        correntDate: thisTime,
        title: missionName.value,
        description: miisionDescription.value,
        date: missionDate.value,
        time: missionTime.value

    };
    let keyName = missionName.value;

    setItemStorage(activity, keyName);
    let correntDate = activity.correntDate
    let title = activity.title;
    let date = activity.date;
    let description = activity.description;
    let time = activity.time;
    newList(title, date, description, time, correntDate);
}

//set-Item Function
function setItemStorage(object, key) {
    let str = JSON.stringify(object);
    localStorage.setItem(key, str);

    //for validation - bug fixing
    return mainIndex = 1;
}



// adding new list 
function newList(title, date, description, time, correntDate) {

    //create new to do list
    let list = document.createElement("li");
    list.classList.add("index");

    let element = document.getElementById("listBox");
    element.appendChild(list);
    list.classList.add("index");


    //create remove button 
    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.setAttribute("id", "removeButton");
    removeButton.addEventListener('click', function () {
        list.parentNode.removeChild(list);
        localStorage.removeItem(title);
    });
    list.appendChild(removeButton);
    removeButton.style.display = "none";

    //show remove only when hover list
    list.onmouseover = function () {
        removeButton.style.display = "";
    }
    list.onmouseleave = function () {
        removeButton.style.display = "none";
    }


    //create check button
    let checkButton = document.createElement("button");
    checkButton.classList.add("checkButton");
    checkButton.setAttribute("id", "checkButton");
    checkButton.addEventListener('click', function () {
        paraName.innerHTML = title + " CHECKED";
        paraName.style.color = "green";
        paraDate.style.color = "green";
        timeCreation.style.backgroundColor = "green"
        localStorage.removeItem(title);
        list.style.boxShadow = "7px 7px 12px green";
        list.style.borderColor = "green";
        checkButton.innerHTML = ('<i class="fa fa-check-square-o"></i>Checked');
    });
    list.appendChild(checkButton);

    //time of creation & article
    let timeCreation = document.createElement("p");
    timeCreation.classList.add("timeCreation");
    list.appendChild(timeCreation);

    let article = document.createElement("article");
    article.classList.add("article");
    list.appendChild(article);




    //create paragraphs in the list
    let paraDate = document.createElement("p");
    paraDate.classList.add("dateActivity");
    article.appendChild(paraDate);

    let paraName = document.createElement("p");
    paraName.classList.add("nameActivity");
    article.appendChild(paraName);


    let paraDescription = document.createElement("p");
    paraDescription.classList.add("descriptionActivity");
    article.appendChild(paraDescription);



    //insert the value from the localstorage
    removeButton.innerHTML = "X";
    paraName.innerHTML = title + "<br>";
    paraDescription.innerHTML = description + "<br><br>";
    paraDate.innerHTML = correntDate;
    if (time == "") {
        timeCreation.innerHTML = "Due Date: " + date + "<br>";

    } else {
        timeCreation.innerHTML = "Due Date: " + date + " at: " + time + "<br>";
    }
    checkButton.innerHTML = '<i class="fa fa-check"> </i>Press to check ';


}



//showing all to do lists
function showAll() {

    //validations
    if (showAllValidations() == 30) {
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {


        let value = localStorage.key(i);
        let getItem = localStorage.getItem(value);
        let str = JSON.parse(getItem);
        let title = str.title;
        let date = str.date;
        let description = str.description;
        let time = str.time;
        let correntDate = str.correntDate;

        newList(title, date, description, time, correntDate);



    }
    //for validation - bug fixing
    return mainIndex = 1;
}



//show all function validations
function showAllValidations() {
    if (localStorage.length == 0) {
        alert("you don't have any To Do Lists yet");
        return 30;
    }
    if (mainIndex != 0) {
        alert("need to reload the page first");
        return 30;
    }
}

function forgotMyEmail() {
    alert("User, you had only one job.");
}


////////End functions//////End functions//////////End functions///////////End functions/////////////End functions/////////////////////////////
// main Index for validation showing to Do Lists

let mainIndex = 0;
