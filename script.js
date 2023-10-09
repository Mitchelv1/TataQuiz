const vragen = [
    {
        vraag: "Welke van de onderstaande zinnen klopt niet? ",
        antwoorden: [
            { text: "Met een combinatietang kan je iets vastpakken", goed: false},
            { text: "Met een combinatietang kan je spijkers uit iets trekken", goed: true},
            { text: "Met een combinatietang kan je dun draad doorknippen", goed: false}
        ]
    },
    {
        vraag: "Met welk gereedschap kan je moeren en bouten aan- of losdraaien?",
        antwoorden: [
            { text: "Met een ringsleutel", goed: true},
            { text: "Met een langbektang", goed: false},
            { text: "Met een flenzenspreider", goed: false}
        ]
    },
    {
        vraag: "Hoe heet het gereedschap dat te zien is in het plaatje?",
        antwoorden: [
            { text: "Een trektang", goed: false},
            { text: "Een zijkniptang", goed: true},
            { text: "Een combinatietang", goed: false}
        ]
    }
];

const vraagElement = document.getElementById("vraag");
const antwoordButtons = document.getElementById("antwoord-buttons");
const volgendeButton = document.getElementById("volgende-btn");

let huidigeVraagIndex = 0;
let score = 0;

function startQuiz(){
    huidigeVraagIndex = 0;
    score = 0;
    volgendeButton.innerHTML = "Volgende";
    nieuweVraag();
}

function nieuweVraag(){
    resetState();
    let huidigeVraag = vragen[huidigeVraagIndex];
    let vraagNo = huidigeVraagIndex + 1;
    vraagElement.innerHTML = vraagNo + ". " + huidigeVraag.vraag;

    huidigeVraag.antwoorden.forEach(antwoord => {
        const button = document.createElement("button");
        button.innerHTML = antwoord.text;
        button.classList.add("btn");
        antwoordButtons.appendChild(button);
        if (antwoord.goed){
            button.dataset.goed = antwoord.goed;
        }
        button.addEventListener("click", selectAntwoord);
    });
}

function resetState(){
    volgendeButton.style.display = "none";
    while(antwoordButtons.firstChild){
        antwoordButtons.removeChild(antwoordButtons.firstChild);
    }
}

function selectAntwoord(e){
    const selectedBtn = e.target;
    const isGoed = selectedBtn.dataset.goed == "true";
    if(isGoed){
        selectedBtn.classList.add("goed");
        score++;
    }else{
        selectedBtn.classList.add("fout");
    }
    Array.from(antwoordButtons.children).forEach(button => {
        if(button.dataset.goed === "true"){
            button.classList.add("goed");
        }
        button.disabled = true;
    });
    volgendeButton.style.display = "block";
}

function showScore(){
    resetState();
    vraagElement.innerHTML = `Je hebt ${score} van de ${vragen.length} goed beantwoord!`;
    volgendeButton.innerHTML = "Quiz opnieuw maken";
    volgendeButton.style.display = "block";
}

function handleVolgendeButton(){
    huidigeVraagIndex++;
    if(huidigeVraagIndex < vragen.length){
        nieuweVraag();
    }else{
        showScore();
    }
}

volgendeButton.addEventListener("click", ()=>{
    if(huidigeVraagIndex < vragen.length){
        handleVolgendeButton();
    }else{
        startQuiz();
    }
});

startQuiz();