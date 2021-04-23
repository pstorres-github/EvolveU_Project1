/* ---Global variables to keep track of current status----*/

let currentPirate = "";
let choice1StepNum = 0
let choice2StepNum = 0
let currentScore = 0
let currentStepScore = 0
let currentLevel = 1
let continueGame = false
let currentStep = 1

/* ---getElementById variables----*/

let playGameButton = document.getElementById("playGame")
let addPirateButton = document.getElementById("addPlayer")
let continueGameButton = document.getElementById ("continueGame")
let pirateList = document.getElementById ("pirateList")

/* ---Internal functions ----*/

async function getFetchCommand (endpoint) {
    try {
        let response = await fetch(endpoint)
        let data = await response.json()
        return data
    } catch (err) {
        console.log (`Problem with fetching data at ${endpoint}`)

    }    
}

async function putFetchCommand (endpoint) {
    try {
        let response = await fetch(endpoint, {
            method: 'PUT'//,
//            header: {
 //               'Content-Type': 'application/json'
   //         },

        })
        let data = await response.json()
    } catch (err) {
        console.log (`Problem with updating data at ${endpoint}`)
    }    
}

async function postFetchCommand (endpoint) {
    try {
        let response = await fetch(endpoint,
        {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },

        })
        let data = await response.json()
    } catch (err) {
        console.log (`Problem with posting data at ${endpoint}`)
    }

}


async function populatePirateList() {

    let pirateList = await getFetchCommand(`/player/list`)
    let selectList = document.getElementById("pirateList")
    
    pirateList.forEach( pirateListItem => {
        let option = document.createElement("option");
        option.value = pirateListItem.name
        option.text = pirateListItem.name
        selectList.appendChild(option)
    } )
   
}    

async function topPirateListScores() {
    
    let topScoreList = await getFetchCommand(`/player/toplist`)
    let numberOfTopScores = topScoreList.length < 5 ? topScoreList.length : 5  // if there are more than 5 pirates, limit visible list to 5 top pirates

    topScoreList.forEach ( (topScoreListItem, i) => {
        document.getElementById(`topPlayer${i}`).innerHTML=`${(i+1)}. ${topScoreListItem.name}, Score: ${topScoreListItem.highScore}`  
    })
}

async function storeGameProgress(currentStep, currentLevel) {
    
    let currentPlayerData = await getFetchCommand(`/player/findByName/${currentPirate}`)
    let currentPirateID=currentPlayerData._id
    await putFetchCommand(`/player/updateProgress/${currentPirateID}/${currentScore}/${currentLevel}/${currentStep}`)

}

async function gameOver()
/* push current Score to Pirate score if it's higher than the score stored currently in the database */
{
    currentPirateData = await getFetchCommand (`/player/findByName/${currentPirate}`)

    let currentPirateID= currentPirateData._id
    let lastPirateScore = currentPirateData.highScore

    if (currentScore > lastPirateScore)
        await putFetchCommand(`/player/updateScore/${currentPirateID}/${currentScore}`)

    topPirateListScores()
}

function addMessagetoScreen(stepData) {

    choice1StepNum = stepData.choice1StepNum
    choice2StepNum = stepData.choice2StepNum
    currentStepScore = stepData.stepScore

    document.getElementById("pointsMessage").innerHTML=`+${stepData.stepScore} points`    
    document.getElementById("message").innerHTML=stepData.message    
    document.getElementById("button1").innerHTML=stepData.choice1
    document.getElementById("button2").innerHTML=stepData.choice2
    document.getElementById("image").src=stepData.image
   
    if (!choice2StepNum)
        document.getElementById("button2").style.display= "none"

    if(stepData.gameOver)
        gameOver()    
    
    document.getElementById("currentLevel").innerHTML = `CHAPTER ${currentLevel}`
    document.getElementById("currentScore").innerHTML = `TOTAL SCORE ${currentScore}`
}

function startGameCheck () {
    let selectedPirateIndex = document.getElementById("pirateList").selectedIndex;
    if (selectedPirateIndex === -1)
        document.getElementById("noPlayerSelected").innerHTML = "ARGHH! Please select a pirate."
    else {
        currentPirate = document.getElementById("pirateList").options[selectedPirateIndex].value
        playGame()
    }
}


async function fetchStep (currentStep, currentLevel) {
    let stepData = await getFetchCommand(`/level${(currentLevel)}/${currentStep}`)
    currentScore += parseInt(currentStepScore,10)
    addMessagetoScreen (stepData)
}

async function restartGame () {
    location.reload()
    currentScore = 0
}

async function playGame(){
    
    if (continueGame === true) {
        let savedData = await getFetchCommand(`/player/findByName/${currentPirate}`)
        
        currentStep=savedData.step
        currentLevel=savedData.level
        currentScore=savedData.score        
    }
        
    document.getElementById("gameSetup").style.display= "none"
    document.getElementById("gameArea").style.visibility= "visible"
    document.getElementById("welcomeMessage").innerHTML = `CAPTAIN ${currentPirate}`
    document.getElementById("currentLevel").innerHTML = `CHAPTER ${currentLevel}`

    fetchStep(currentStep, currentLevel)

}

/*-----Event Listeners ------*/

/* Pirate Selection List */
pirateList.addEventListener("click", function() {
        let selectedPirateIndex = pirateList.selectedIndex;
        document.getElementById("pirateInfoText").innerHTML=`${pirateList.options[selectedPirateIndex].value} selected`
})

/* Add Pirate Button */
addPirateButton.addEventListener("click", async function() {

    let newPirate = document.getElementById("newPlayer").value;
    
    if (newPirate == null || newPirate =="") {
        document.getElementById("pirateExistsError").innerHTML= "Nothing entered.  Please enter a name."
        return
    }    
    
    /* check if pirate already exists */
    let pirateData = await getFetchCommand (`/player/findByName/${newPirate}`)
   
    if (pirateData.name !== null) {
        document.getElementById("pirateExistsError").innerHTML= "Pirate already exists.  Please enter a different name."
        return
    }

    await postFetchCommand(`/player/create/${newPirate}`)
    
    /*add new Pirate to list*/
    let selectList = document.getElementById("pirateList")
    let option = document.createElement("option");
    option.value = newPirate
    option.text = newPirate
    selectList.appendChild(option)
    selectList[selectList.length-1].selectedIndex = true;
    document.getElementById("pirateExistsError").innerHTML= "Pirate successfully added to list."
    

},false)

playGameButton.addEventListener("click", startGameCheck, false)

continueGameButton.addEventListener("click", () => {
      continueGame=true
      startGameCheck()

}, false)

document.getElementById("button1").addEventListener("click", async function() {

    // level is complete - save the score
    if (choice1StepNum === "Level Up") {
       await storeGameProgress(currentStep, currentLevel)
       currentLevel++
        currentStep = 1
    } else if (choice1StepNum === 'RESTART') {
         await gameOver()
         restartGame()
    } else { 
        currentStep = choice1StepNum
    }
     await fetchStep(currentStep, currentLevel)
    

 })
 
 document.getElementById("button2").addEventListener("click", async function() {

    if (choice1StepNum === "Level Up") {
         await storeGameProgress(currentStep, currentLevel)
         currentLevel++
         currentStep = 1
     }   
     if (choice2StepNum === 'RESTART') {
         await gameOver()
         restartGame()
     } else {
         currentStep = choice2StepNum  
     }
     await fetchStep(currentStep, currentLevel)        
     
 })

populatePirateList()
topPirateListScores()







