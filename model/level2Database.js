const level2Database = [
    {
        stepNum: "1",
        image: "./img/darkjungle.jpg", 
        message: `In your excitement, you discover that you have forgotten your map in the lava tube.  
                  You set off to retreive the map, but mistakenly take a different route.
                  You enter a foreboding forest, and start to 
                  hear voices calling you in every direction.  You start to run and approach an ominous bridge.
                  Do you take your chances and cross the bridge, or try and find another way?`,
        choice1: "Cross the bridge",
        choice1StepNum: "2",
        choice2: "Find another way",
        choice2StepNum: "3",
        stepScore: 20,
        gameOver: false
    },   
    {
        stepNum: "2",
        image: "./img/bridge.jpg",
        message: `You struggle to stay on the bridge with your treasure, yet refuse to let it go.  The bridge ropes snap,
                  and you fall, treasure and all, into the depths of the valley.  The island has reclaimed the treasure for
                  another brave soul to find.`,
        choice1: "Restart Game",
        choice1StepNum: "RESTART",
        choice2:  null,
        choice2StepNum: null,
        stepScore: 0,
        gameOver: true
    
    },
    {
        stepNum: "3",
        image: "./img/ruby.jpg",
        message: `After 10 days you make your way out of the forest.  You can see your ship in
        the distance.  You pick up the pace and start running, but you stumble and fall onto the
        ground.  As you pick yourself up, you notice a beautiful red ruby hidden in the leaves.  Do
        you take the ruby, or get up and keep running?`,
        choice1: "Pick up the ruby",
        choice1StepNum: "4",
        choice2: "Keep running",
        choice2StepNum: "5",
        stepScore: 50,
        gameOver: true

    },
    {
        stepNum: "4",
        image: "./img/quicksand.jpg",
        message: `Quicksand suddenly appears beneath you, and swallows you and the treasure up.  You
        were so close, but the lure of more treasure was too irresistible.`,
        choice1: "Restart Game",
        choice1StepNum: "RESTART",
        choice2:  null,
        choice2StepNum: null,
        stepScore: 0,
        gameOver: true

    },
    {
        stepNum: "5",
        image: "./img/pirateship.jpg",
        message:   `You board your ship, and quickly tell your crew to hoist the anchors.  You live to
        brag about your adventure, and enjoy your treasure! Or so you think....`,
        choice1: "Go to Chapter 3",
        choice1StepNum: "Level Up",
        choice2:  "No thanks, I'm done",
        choice2StepNum: "RESTART",
        stepScore: 100,
        gameOver: false

    }
]

module.exports = { level2Database }