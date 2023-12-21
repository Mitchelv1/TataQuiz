const firebaseConfig = {
    apiKey: "AIzaSyDv61az4_Xo4aTlQB7RdLWCwfVgAMF4Faw",
    authDomain: "tataquizzen.firebaseapp.com",
    databaseURL: "https://tataquizzen-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tataquizzen",
    storageBucket: "tataquizzen.appspot.com",
    messagingSenderId: "601340020695",
    appId: "1:601340020695:web:eb8372d5464be2b6caed92",
    measurementId: "G-295KRN0CPH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database()

let uid;
let vraagCount = 1;
let buttonid = 0;
let aantalVragen = 1;
let goed = 0;
let laatsteVraag = false;
let quizVragen = '';
let quizNaam = '';
let seconden = 0;
let minuten = 0;
let restSeconden = 0;
let timerInterval;
const selectedAntwoord = [];
const AGoed = [];
const vraagElement = document.getElementById("vraag");
const antwoordButtons = document.getElementById("antwoord-buttons");
const volgendeButton = document.getElementById("volgende-btn");
const vorigeButton = document.getElementById("vorige-btn");
const imgDiv = document.getElementById("imagediv");
const vraagNummer = document.getElementById("vraagnr");
const buttonA = document.getElementById("0");
const buttonB = document.getElementById("1");
const buttonC = document.getElementById("2");
const timer = document.getElementById("timertxt");
const eindeTitel = document.getElementById("eindeTitel");
const letOp = document.getElementById("letOp");
const eindeForm = document.getElementById("eindeForm");
const formInput = document.getElementById("formInput");
const resultaatDiv = document.getElementById("resultaatDiv");
const resultaatTxt = document.getElementById("resultaatTxt");
const naamInput = document.getElementById("naamInput");
const submitBtn = document.getElementById("submitBtn");
const terugBtn = document.getElementById("terugBtn");
// const emailInput = document.getElementById("emailInput");

// const testbtn = document.getElementById("testbtn");

document.addEventListener('DOMContentLoaded', startTimer);

function startQuiz(){
    if (document.title === "Gereedschappen Quiz | Tata Quiz"){
        quizVragen = '../vragen/vragengs.json';
        quizNaam = 'gsvragen';
    } else if (document.title === "Pompen Quiz | Tata Quiz"){
        quizVragen = '../vragen/vragenpp.json';
        quizNaam = 'ppvragen';
    }
    // eindeForm.hidden = true;
    // errorMsg.hidden = true;
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        while (data.vragen[aantalVragen].laatste != "ja"){
            aantalVragen++;
            // console.log(aantalVragen);
        }
        // if(data.vragen[vraagCount].laatste == "ja"){
        //     volgendeButton.innerHTML = "Inleveren";
        // }
        // else{
        //     volgendeButton.innerHTML = "Volgende";
        // }
        // console.log(data.vragen[1].type);
    });
    // fetch('../vragen/vragengs.json')
    // .then(res => res.json())
    // .then(data => {
    //     while (data.vragen[vraagCount].laatste != "ja"){
    //         aantalVragen++;
    //     }
    //     console.log(aantalVragen);
    // })
    getType();
}
function formatTimer(num){
    return num < 10 ? '0' + num : '' + num; 
}
function startTimer(){
    timerInterval = setInterval(function () {
        seconden++;

        minuten = Math.floor(seconden / 60);

        restSeconden = seconden % 60;

        timer.textContent = `${formatTimer(minuten)}:${formatTimer(restSeconden)}`; 
    }, 1000);
}
// var start = Date.now();
// setInterval(function () {
//     var delta = Date.now() - start;
//     output(Math.floor(delta / 1000));

// }, 1000);

function getType(){
    if (AGoed[vraagCount] == null){
        // console.log(vraagCount-1 + "min 1")
        // console.log(vraagCount + "current")
        checkGoed();
    }
    volgendeButton.disabled = true;
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        if(vraagCount == aantalVragen){
            volgendeButton.innerHTML = "Inleveren";
        }
        else{
            volgendeButton.innerHTML = "Volgende";
        }
        if (data.vragen[vraagCount].type == "normal"){
            // console.log("normale vraag")
            imgDiv.classList.remove("imagestyle");
            NormaalVraag();
        } else if (data.vragen[vraagCount].type == "image"){
            // console.log("image vraag")
            imgDiv.classList.add("imagestyle");
            // antwoordButtons.classList.remove("antwoord-buttons")
            // antwoordButtons.classList.add("antwoord-buttonsimg");
            ImageVraag();
        }
        // console.log(data.vragen[1].type);
    })
    if (vraagCount == 1){
        vorigeButton.disabled = true;
    }
    else{
        vorigeButton.disabled = false;
    }
    Opgeslagen();
}

function NormaalVraag(){
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        vraagElement.innerHTML =  data.vragen[vraagCount].vraag;
        data.vragen[vraagCount].antwoorden.forEach(antwoord => {
            var button = document.getElementById(buttonid)
            button.innerHTML = antwoord.text;
        // const button = document.createElement("button");
        // button.innerHTML = antwoord.text;
        // button.classList.add("btn");
        // button.setAttribute('id', buttonid)
        // antwoordButtons.appendChild(button);
        buttonid++;
     });
     if (vraagCount < 10){
        vraagNummer.innerHTML = "0" + vraagCount + "/" + aantalVragen;
     }
     else {
        vraagNummer.innerHTML = vraagCount + "/" + aantalVragen;
     }
     buttonid = 0;
    })
    isSelected();
    // console.log(laatsteVraag)
}

function ImageVraag(){
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        vraagElement.innerHTML =  data.vragen[vraagCount].vraag;
        data.vragen[vraagCount].antwoorden.forEach(antwoord => {
            var button = document.getElementById(buttonid)
            button.innerHTML = antwoord.text;
        // const button = document.createElement("button");
        // button.innerHTML = antwoord.text;
        // button.classList.add("btn");
        // button.setAttribute('id', buttonid)
        // antwoordButtons.appendChild(button);
        buttonid++;
     });
     if (vraagCount < 10){
        vraagNummer.innerHTML = "0" + vraagCount + "/" + aantalVragen;
     }
     else {
        vraagNummer.innerHTML = vraagCount + "/" + aantalVragen;
     }
     const imagesrc = data.vragen[vraagCount].image;
     const img = document.createElement("img");
     img.src = '../images/' + imagesrc + '.png';
     img.classList.add('image');
     img.loading = "lazy";
     imgDiv.appendChild(img);
     buttonid = 0;
    })
    isSelected();
    // console.log(laatsteVraag)
}

function isSelected(){
    // while(!buttonA.classList.contains("selected")){
    //     volgendeButton.disabled = true;
    // }
    if (buttonA.classList.contains("selected")){
        volgendeButton.disabled = false;
    }
    if (buttonB.classList.contains("selected")){
        volgendeButton.disabled = false;
    }    
    if (buttonC.classList.contains("selected")){
        volgendeButton.disabled = false;
    }
}

function checkGoed(){
    var agoed_ref = database.ref(quizNaam + '/' + vraagCount + '/goed')
    agoed_ref.on('value', function(snapshot){
        var data = snapshot.val()
        // console.log(data);
        AGoed[vraagCount] = data;
        // console.log(AGoed[1] + " dit is 1");
        // console.log(AGoed[2] + " dit is 2");
    })
}
volgendeButton.addEventListener("click", ()=>{
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        if (!laatsteVraag){
            if(vraagCount+1 == aantalVragen){
                // console.log("dit was de laatste vraag");
                // volgendeButton.disabled = true;
                laatsteVraag = !laatsteVraag;
            }
            vraagCount++;
            // while(antwoordButtons.firstChild){
            //      antwoordButtons.removeChild(antwoordButtons.firstChild);
            //     }
            buttonSelect();
            while(imgDiv.firstChild){
            imgDiv.removeChild(imgDiv.firstChild);
            }
            getType();
        }
        else {
            getForm();
        }
        // }
        // if (!laatsteVraag){
        // console.log(laatsteVraag)
    })
    // console.log(vraagCount);
});

vorigeButton.addEventListener("click", ()=>{
    fetch(quizVragen)
    .then(res => res.json())
    .then(data => {
        if (volgendeButton.disabled){
            volgendeButton.disabled = false;
            volgendeButton.innerHTML = "Volgende"
            // laatsteVraag = false;
        }
        if (laatsteVraag){
            laatsteVraag = !laatsteVraag
        }
        if (vraagCount >= 2){
            vraagCount--;
            // while(antwoordButtons.firstChild){
            //      antwoordButtons.removeChild(antwoordButtons.firstChild);
            //     }
            buttonSelect();
            while(imgDiv.firstChild){
                imgDiv.removeChild(imgDiv.firstChild);
            }
            getType();
        }
    })
    Opgeslagen();
    // console.log(vraagCount);
});

buttonA.onclick = function (){
    buttonSelect();
    buttonA.classList.add("selected");
    selectedAntwoord[vraagCount] = "A";
    // console.log(selectedAntwoord[vraagCount]);
}
buttonB.onclick = function (){
    buttonSelect();
    buttonB.classList.add("selected");
    selectedAntwoord[vraagCount] = "B";
    // console.log(selectedAntwoord[vraagCount]);
}
buttonC.onclick = function (){
    buttonSelect();
    buttonC.classList.add("selected");
    selectedAntwoord[vraagCount] = "C";
    // console.log(selectedAntwoord[vraagCount]);
}

function buttonSelect(){
    buttonA.classList.remove("selected");
    buttonB.classList.remove("selected");
    buttonC.classList.remove("selected");
    volgendeButton.disabled = false;
}

function Opgeslagen(){
    // volgendeButton.disabled = false;
    if (selectedAntwoord[vraagCount] == "A"){
        buttonA.classList.add("selected");
        // console.log(selectedAntwoord[vraagCount] + " A");
    }
    if (selectedAntwoord[vraagCount] == "B"){
        buttonB.classList.add("selected");
        // console.log(selectedAntwoord[vraagCount] + " B");
    }
    if (selectedAntwoord[vraagCount] == "C"){
        buttonC.classList.add("selected");
        // console.log(selectedAntwoord[vraagCount] + " C");
    }
}

// testbtn.onclick = function(){

// }
function countScore(){
    let i = 1;
    while (i <= aantalVragen){
        if (selectedAntwoord[i] == AGoed[i] && selectedAntwoord[i] != null){
            goed++;
        }
        i++;
    }
}

function getForm(){
    // checkGoed();
    // console.log("Dit is antwoord van vraag 5 " + AGoed[5]);
    clearInterval(timerInterval);
    uid = localStorage.getItem("UID");
    if (uid == null){
        uid = Date.now().toString(36) + Math.random().toString(36).substring(2,12).padStart(12, 0);
        localStorage.setItem("UID", JSON.stringify(uid))
        // console.log(uid);
    }
    else{
        // console.log(uid);
    }
    timer.remove();
    vraagElement.remove();
    vorigeButton.disabled = true;
    imgDiv.remove();
    antwoordButtons.remove();
    vorigeButton.remove();
    vraagNummer.remove();
    volgendeButton.remove();
    eindeForm.hidden = false;
    countScore();
}

submitBtn.onclick = function () {checkScore()};

function checkScore(){
    var goed_ref = database.ref('users/' + uid + '/' + quizNaam + '/goed')
    goed_ref.on('value', function(snapshot){
        var data = snapshot.val()
        if (goed > data){
            postScore();
        }
        if (goed == data){
            var tijd_ref = database.ref('users/' + uid + '/' + quizNaam + '/tijd')
            tijd_ref.on('value', function(snapshot){
                    var data = snapshot.val()
                    if (seconden < data){
                        postScore();
                    }
                })
            }
        })
    loadScore();
}
function postScore(){
    database.ref('users/' + uid + '/' + quizNaam).set({
        naam: naamInput.value,
        goed: goed,
        tijd: seconden
    })
}
function loadScore(){
    formInput.remove();
    eindeTitel.remove();
    letOp.remove();
    eindeForm.classList.add("centerResultaat");
    resultaatDiv.hidden = false;
    // resultaatDiv.classList.add("formInput")
    resultaatTxt.innerHTML = "Je hebt " + goed + " van de " + aantalVragen + " vragen goed en een tijd behaald van " + `${formatTimer(minuten)}:${formatTimer(restSeconden)}` + "!";
    terugBtn.hidden = false;
    // console.log('data opgeslagen');
    // console.log(goed + " vragen goed");
    // console.log(uid, naamInput.value);
    // document.getElementById("naamInput").value;
}
startQuiz();
// getType();
// const vragen = [
//     {
//         vraag: "Welke van de onderstaande zinnen klopt niet? ",
//         antwoorden: [
//             { text: "Met een combinatietang kan je iets vastpakken", goed: false},
//             { text: "Met een combinatietang kan je spijkers uit iets trekken", goed: true},
//             { text: "Met een combinatietang kan je dun draad doorknippen", goed: false}
//         ]
//     },
//     {
//         vraag: "Met welk gereedschap kan je moeren en bouten aan- of losdraaien?",
//         antwoorden: [
//             { text: "Met een ringsleutel", goed: true},
//             { text: "Met een langbektang", goed: false},
//             { text: "Met een flenzenspreider", goed: false}
//         ]
//     },
//     {
//         vraag: "Hoe heet het gereedschap dat te zien is in het plaatje?",
//         antwoorden: [
//             { text: "Een trektang", goed: false},
//             { text: "Een zijkniptang", goed: true},
//             { text: "Een combinatietang", goed: false}
//         ]
//     }
// ];

// const antwoordButtons = document.getElementById("antwoord-buttons");
// const volgendeButton = document.getElementById("volgende-btn");

// let huidigeVraagIndex = 0;
// let score = 0;

// function startQuiz(){
//     huidigeVraagIndex = 0;
//     score = 0;
//     volgendeButton.innerHTML = "Volgende";
//     nieuweVraag();
// }

// function nieuweVraag(){
//     resetState();
//     let huidigeVraag = vragen[huidigeVraagIndex];
//     let vraagNo = huidigeVraagIndex + 1;
//     vraagElement.innerHTML = vraagNo + ". " + huidigeVraag.vraag;

//     huidigeVraag.antwoorden.forEach(antwoord => {
//         const button = document.createElement("button");
//         button.innerHTML = antwoord.text;
//         button.classList.add("btn");
//         antwoordButtons.appendChild(button);
//         if (antwoord.goed){
//             button.dataset.goed = antwoord.goed;
//         }
//         button.addEventListener("click", selectAntwoord);
//     });
// }

// function resetState(){
//     volgendeButton.style.display = "none";
//     while(antwoordButtons.firstChild){
//         antwoordButtons.removeChild(antwoordButtons.firstChild);
//     }
// }

// function selectAntwoord(e){
//     const selectedBtn = e.target;
//     const isGoed = selectedBtn.dataset.goed == "true";
//     if(isGoed){
//         selectedBtn.classList.add("goed");
//         score++;
//     }else{
//         selectedBtn.classList.add("fout");
//     }
//     Array.from(antwoordButtons.children).forEach(button => {
//         if(button.dataset.goed === "true"){
//             button.classList.add("goed");
//         }
//         button.disabled = true;
//     });
//     volgendeButton.style.display = "block";
// }

// function showScore(){
//     resetState();
//     vraagElement.innerHTML = `Je hebt ${score} van de ${vragen.length} goed beantwoord!`;
//     volgendeButton.innerHTML = "Quiz opnieuw maken";
//     volgendeButton.style.display = "block";
// }

// function handleVolgendeButton(){
//     huidigeVraagIndex++;
//     if(huidigeVraagIndex < vragen.length){
//         nieuweVraag();
//     }else{
//         showScore();
//     }
// }

// volgendeButton.addEventListener("click", ()=>{
//     if(huidigeVraagIndex < vragen.length){
//         handleVolgendeButton();
//     }else{
//         startQuiz();
//     }
// });

// startQuiz();