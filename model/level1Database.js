const level1Database = [
    {
        stepNum: "1",
        image: "./img/pirateship.jpg", 
        message: `As you are sailing at sea, you spot a bottle in the waves with a map inside.
                  You order your crew to retreive it.  You find an ancient treasure map inside.  Do you change direction and follow the map,
                  or throw the bottle back into the sea and stay on the current course?`,
        choice1: "Follow the map",
        choice1StepNum: "2",
        choice2: "Stay on current course",
        choice2StepNum: "5",
        stepScore: 10,
        gameOver: false
    },   
    {
        stepNum: "2",
        image: "./img/map.jpg",
        message: `You follow the map until you have reached the island.  The map shows two routes to the treasure:  Either
            through the jungle or through the dark valley.  Which one do you choose?`,
        choice1: "Through the jungle",
        choice1StepNum: "3",
        choice2: "Through the dark valley",
        choice2StepNum: "4",
        stepScore: 20,
        gameOver: false
    
    },
    {
        stepNum: "3",
        image: "./img/jaguar.jpg",
        message: `You make your way through the dense jungle, and hear many creatures along the way.
                    Suddenly, you come face to face with a jaguar.  Do you stand your ground and fight
                    the jaguar, or do you run away and try and go through the dark valley instead?`,
        choice1: "Fight the jaguar",
        choice1StepNum: "6",
        choice2: "Run away",
        choice2StepNum: "4",
        stepScore: 20,
        gameOver: false

    },
    {
        stepNum: "4",
        image: "./img/darkjungle.jpg",
        message:   `You realize too late that the dark valley is a terrible and impossible route.  You get lost and
                    circle around for days and days.  You eventually meet your untimely demise.`,
        choice1: "Restart Game",
        choice1StepNum: "RESTART",
        choice2:  null,
        choice2StepNum: null,
        stepScore: 0,
        gameOver: true
    },
    {
        stepNum: "5",
        image:  "./img/battle.jpg",
        message: `You stay on course.  Unfortunately, you end up headed straight into the path
                    of Royal Navy ships.  You put up a valiant fight, but your ship sustains heavy damage and sinks.
                    It was an epic battle for the history books.`,
        choice1: "Restart Game",
        choice1StepNum: "RESTART",
        choice2:  null,
        choice2StepNum: null,
        stepScore: 0,
        gameOver: true

    },   
    {
        stepNum: "6",
        image: "./img/volcano.jpg",
        message:   `You battle the jaguar.  It's a tough fight, but you make it out alive!  You keep going
                    and reach a huge volcano.  You find an old lava tube and crawl inside.  You find a locked
                    treasure chest.  Beside it is a scroll with a riddle scribbled on it:  "A merchant can place 8 large boxes or 10 small boxes into a carton for shipping. 
                    In one shipment, he sent a total of 96 boxes. If there are more large boxes than small boxes,
                    how many cartons did the merchant ship?"`,
        choice1: "65",
        choice1StepNum: "7",
        choice2:  "11",
        choice2StepNum: "8",
        stepScore: 30,
        gameOver: false

    },
    {   
        stepNum: "7",
        image: "../img/lava.jpg",
        message: `Your guess is incorrect.  The floor opens up, and you get swallowed up by the lava underneath.
                    The treasure remains untouched for the next brave pirate.`,
        choice1: "Restart Game",
        choice1StepNum: "RESTART",
        choice2:  null,
        choice2StepNum: null,
        stepScore: 0,
        gameOver: true
    },
    {   
        stepNum: "8",
        image: "./img/treasure.jpg",
        message:  `CHAPTER 1 COMPLETE:  A key magically appears.  You open the treasure chest, and discover that it is filled with
                    ancient treasure and jewels.  You joyfully make your way back to the pirate ship,
                    and enjoy the treasure!  However, you fail to realise the treasure is cursed and the island will not let
                    you get away that easily....`,
        choice1: "Go to Chapter 2",
        choice1StepNum: "Level Up",
        choice2: "No thanks, I'm done",
        choice2StepNum: "RESTART",
        stepScore: 100,
        gameOver: false


    },

]

module.exports = { level1Database }