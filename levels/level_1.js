class LevelSettings{
    constructor(globalModifires){
        this.yes = 0;
    }
}

class Level{
    constructor(){
        this.eventTimings = [40,120];

        this.levelObjects = [
            {
                name: 'enemy_1.js', 
                n: "Enemy1",
                setID: 1,
            },
            {
                name: 'neutral_object_1.js', 
                n: "Neutral_Object_1",
                setID: 3,
            },
        ],
        //background objects and images
        this.background = {
            bckObjectMap: [
                {
                    bck: [
                        [],
                        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0]
                    ]
                },
                {
                    bck: [
                        [],
                        [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
                        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
                    ]
                }
            ],

            bckImg: [
                {
                    name: null,
                    src: 'nah'
                },
                {
                    name: null,
                    src: 'nah'
                }  
            ]
        };

        //stages of level
        this.stages = [
            {
                timing: 120,
                //hostile
                hostileWave: {
                    set: [
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
                        [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
                        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                    ],
                },
                
                //neutral
                neutralWave: {
                    set: [
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0],
                        [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
                        [0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0]
                    ],
                }
            }

        ]

    }    
}

export {LevelSettings, Level};




/*

        this.levelSpeed = null;
        this.winCondition = null;
        this.failCondition = null;


        this.musicList = [
            {
                name: "music.mp3",
                src: "./music",
                type: "intro/outro/loop/single"
            },
            {
                name: "music.mp3",
                src: "./music",
                type: "intro/outro/loop/single"
            }
        ]

        this.soundList = [
            {
                name: "music.mp3",
                src: "./music",
                type: "intro/outro/loop/single"
            },
            {
                name: "music.mp3",
                src: "./music",
                type: "intro/outro/loop/single"
            }
        ]


        this.spriteList = [
            {
                name: "pewpew.jpg",
                src: "./assets",
                //type: "friendly/hostile/neutral/background"
            },
            {
                name: "pewpew.jpg",
                src: "./assets",
                //type: "friendly/hostile/neutral/background"
            }
        ]

        this.objectList = [
            {
                name: "enemy_1",
                src: "./objects",
                type: "hero/weapon/enemy/bck_object"
            },
            {
                name: "enemy_1",
                src: "./objects",
                type: "hero/weapon/enemy/bck_object"
            }
        ]



*/