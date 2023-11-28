let vraagCount = 1;
let buttonid = 0;
let aantalVragen = 0;
const selectedAntwoord = [];
const vraagElement = document.getElementById("vraag");
const antwoordButtons = document.getElementById("antwoord-buttons");
const volgendeButton = document.getElementById("volgende-btn");
const vorigeButton = document.getElementById("vorige-btn");
const imgDiv = document.getElementById("imagediv");
const vraagNummer = document.getElementById("vraagnr");
const buttonA = document.getElementById("0");
const buttonB = document.getElementById("1");
const buttonC = document.getElementById("2");

function startQuiz(){
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
function getType(){
    volgendeButton.disabled = true;
    fetch('../vragen/vragengs.json')
    .then(res => res.json())
    .then(data => {
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
    fetch('../vragen/vragengs.json')
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
     vraagNummer.innerHTML = vraagCount + "/30"
     buttonid = 0;
    })
    isSelected();
}

function ImageVraag(){
    fetch('../vragen/vragengs.json')
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
     vraagNummer.innerHTML = vraagCount + "/30"
     const imagesrc = data.vragen[vraagCount].image;
     const img = document.createElement("img");
     img.src = '../images/' + imagesrc + '.png';
     img.classList.add('image')
     imgDiv.appendChild(img);
     buttonid = 0;
    })
    isSelected();
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
volgendeButton.addEventListener("click", ()=>{
    fetch('../vragen/vragengs.json')
    .then(res => res.json())
    .then(data => {
        if(data.vragen[vraagCount+1].laatste == "ja"){
            // console.log("dit was de laatste vraag");
            // volgendeButton.disabled = true;
            volgendeButton.innerHTML = "Inleveren"
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
    })
});

vorigeButton.addEventListener("click", ()=>{
    fetch('../vragen/vragengs.json')
    .then(res => res.json())
    .then(data => {
        if (volgendeButton.disabled){
            volgendeButton.disabled = false;
            volgendeButton.innerHTML = "Volgende"
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