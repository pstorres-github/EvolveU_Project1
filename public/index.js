
let currentPirate = "";
let choice1StepNum = 0
let choice2StepNum = 0
let currentScore = 0
let currentStepScore = 0
let currentLevel = 1
let continueGame = false

let playGameButton = document.getElementById("playGame")
let addPirateButton = document.getElementById("addPlayer")
let continueGameButton = document.getElementById ("continueGame")
let pirateList = document.getElementById ("pirateList")

populatePirateList()
topPirateListScores()

pirateList.addEventListener("click", function() {
        let selectedPirateIndex = pirateList.selectedIndex;
        document.getElementById("pirateInfoText").innerHTML=`${pirateList.options[selectedPirateIndex].value} selected`
})


addPirateButton.addEventListener("click", async function() {

    let newPirate = document.getElementById("newPlayer").value;
    let pirateExists = false
   
    /* do not allow repeated pirate names */
console.log (`${newPirate}`,"new pirate" )

    await fetch(`/player/findByName/${newPirate}`)
        .then((response) => response.json())
        .then((data) => {
            console.log (data,"data" )
            if (data != null)
                pirateExists = true 
                
        })
    .catch((err)=> console.log('Error fetching findByName/currentPirate',err))
    
    if (pirateExists)
        document.getElementById("pirateExistsError").innerHTML= "Pirate already exists.  Please enter a different name."
    else if (newPirate == null || newPirate =="")
        document.getElementById("pirateExistsError").innerHTML= "Nothing entered.  Please enter a name."
    else {
        fetch(`/player/create/${newPirate}`, {
            method: 'POST',
            header: {
                            'Content-Type': 'application/json'
            },
            
        })
            .then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))

        let selectList = document.getElementById("pirateList")
        let option = document.createElement("option");
        option.value = newPirate
        option.text = newPirate
        selectList.appendChild(option)
        selectList[selectList.length-1].selectedIndex = true;
    }

},false)

playGameButton.addEventListener("click", function() {
    let selectedPirateIndex = document.getElementById("pirateList").selectedIndex;
    if (selectedPirateIndex === -1)
        document.getElementById("noPlayerSelected").innerHTML = "ARGHH! Please select a pirate."
    else {
        currentPirate = document.getElementById("pirateList").options[selectedPirateIndex].value
        playGame()
    }
},false)

continueGameButton.addEventListener("click", function() {
    console.log("continue button clicked")
    let selectedPirateIndex = document.getElementById("pirateList").selectedIndex;
    if (selectedPirateIndex === -1)
        document.getElementById("noPlayerSelected").innerHTML = "ARGHH! Please select a pirate."
    else {
        currentPirate = document.getElementById("pirateList").options[selectedPirateIndex].value
        continueGame = true
        playGame()
    }
},false)


function populatePirateList() {
    fetch(`/player/list`)
        .then((response) => response.json())
        .then((data) => {
            
            let selectList = document.getElementById("pirateList")
            
            for (let i=0; i<data.length; i++) {
                let option = document.createElement("option");
                option.value = data[i].name
                option.text = data[i].name
                selectList.appendChild(option)
            }
        })
        .then((data) => console.log(`fetched`,data))
}

function topPirateListScores() {
    fetch(`/player/toplist`)
        .then((response) => response.json())
        .then((data) => {
            let numberOfTopScores = data.length < 5 ? data.length : 5  // if there are more than 5 pirates, limit visible list to 5 top pirates
            console.log("top players",data, data.length)
            for (let i=0; i < numberOfTopScores; i++) {
                let outputString = `${(i+1)}. ${data[i].name}, Score: ${data[i].highScore}`    
                document.getElementById(`topPlayer${i}`).innerHTML=outputString
            }    
        })
        .catch((err) => console.log(`Error fetching top player list`,err))
}


async function storeGameProgress(currentStep, currentLevel) {
    
    let currentPirateID = null
    let lastPirateScore = null

    let data = await fetchCurrentPirate()

    currentPirateID=data._id
    lastPirateScore = data.score
            
    fetch(`/player/updateProgress/${currentPirateID}/${currentScore}/${currentLevel}/${currentStep}`, 
    {
         method: 'PUT'
    })
    .then((res) => res.json())
    .then((data) =>  console.log(data))
    .catch((err)=>console.log('Error fetching player/updateScore',err))

}





async function gameOver()
/* push current Score to Pirate score if it's higher than the score stored currently in the database */
{
    /* get current pirate ID */
    let currentPirateID = null
    let lastPirateScore = null

    data = await fetchCurrentPirate()

    currentPirateID= data._id
    lastPirateScore = data.highScore

    console.log(currentScore,": line 163")
    console.log(lastPirateScore,": line 164")

    if (currentScore > lastPirateScore) {
        await fetch(`/player/updateScore/${currentPirateID}/${currentScore}`, 
            {
                 method: 'PUT'
            })
            .then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log('Error fetching player/updateScore',err))
        
    }    

    topPirateListScores()

    currentScore = 0
}

function addMessagetoScreen(data) {

    choice1StepNum = data.choice1StepNum
    choice2StepNum = data.choice2StepNum
    currentStepScore = data.stepScore




    document.getElementById("pointsMessage").innerHTML=`+${data.stepScore} points`    
    document.getElementById("message").innerHTML=data.message    
    document.getElementById("button1").innerHTML=data.choice1
    document.getElementById("button2").innerHTML=data.choice2
    document.getElementById("image").src=data.image

    
    
    console.log("choice1stepnum", choice1StepNum)
    console.log("choice2stepnum", choice2StepNum)
    currentScore += parseInt(currentStepScore,10)
    document.getElementById("currentLevel").innerHTML = `LEVEL ${currentLevel}`
    document.getElementById("currentScore").innerHTML = `SCORE ${currentScore}`


    if (choice1StepNum == null || choice2StepNum == null) 
        document.getElementById("div2").style.visibility= "hidden"

    if(data.gameOver === true)
        gameOver()
}

async function fetchStep (currentStep, currentLevel) {
    console.log("current level, current step", currentLevel, currentStep)
    let response = await fetch(`/level${(currentLevel)}/${currentStep}`)
    
    let data = await response.json()
    addMessagetoScreen (data)
    
}

async function fetchCurrentPirate() {
    let response = await fetch(`/player/findByName/${currentPirate}`)
    let data = await response.json()
    return data
}


async function playGame(){
    let currentStep = 1
    currentLevel = 1

    if (continueGame === true) {
        let data = await fetchCurrentPirate()
        
        currentStep=data.step
        currentLevel= data.level
        currentScore=data.score        
        
        /*

        await fetch(`/player/findByName/${currentPirate}`)
        .then((response) => response.json())
        .then((data) => {
            {
                currentStep=data.step
                currentLevel= data.level
                currentScore=data.score
                
            }
        })
        .catch((err)=> console.log('Error fetching findByName/currentPirate',err))*/
    }
      /*fetch step and level stored in pirate data*/

    
    
    document.getElementById("gameSetup").style.display= "none"
    document.getElementById("gameArea").style.visibility= "visible"
    document.getElementById("welcomeMessage").innerHTML = `CAPTIAN ${currentPirate}`
    document.getElementById("currentLevel").innerHTML = `LEVEL ${currentLevel}`
    

    fetchStep(currentStep, currentLevel)

    document.getElementById("button1").addEventListener("click", async function() {

       // currentScore += parseInt(currentStepScore,10)
       if (choice1StepNum === "Level Up") {
            currentLevel++
            currentStep = 1
            storeGameProgress(currentStep, currentLevel)
       } 
       else currentStep = choice1StepNum
        await fetchStep(currentStep, currentLevel)

     
    })
    
    document.getElementById("button2").addEventListener("click", async function() {
                console.log(currentScore, "before click")
        //        currentScore += parseInt(currentStepScore,10)
        if (choice2StepNum === "Level Up") {
            currentLevel++
            currentStep = 1
            storeGameProgress(currentStep, currentLevel)
       }
       else currentStep = choice1StepNum     
        
        currentStep = choice2StepNum
        await fetchStep(currentStep, currentLevel)        
        console.log(currentScore, "after click")       

      /*  if (choice2StepNum === null) 
            document.getElementById("button2").visibility=hidden        */
        
    })

}











