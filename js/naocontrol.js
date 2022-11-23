var nao = {
    debug: true,
    session: null,
    animatedSay: null,
    behaviourManager: null,
    motion:null,
    posture:null,
    video:null,
    system:null,
    life:null,


    init: function (address) {
        console.log("Nao Control loading");

        QiSession(function (Qisession) {
            nao.session = Qisession;
            console.log("connected!");
            // you can now use your QiSession
            nao.session.service("ALBehaviorManager").then(nao.StartBehaviourService, nao.error);
            nao.session.service("ALAnimatedSpeech").then(nao.StartAnimatedSpeechService,nao.error);
            nao.session.service("ALSystem").then(nao.StartSystem,nao.error);
            nao.session.service("ALMotion").then(nao.StartMotionSystem,nao.error);
            nao.session.service("ALVideoDevice").then(nao.StartVideoSystem,nao.error);
            nao.session.service("ALRobotPosture").then(nao.StartPostureSystem,nao.error);
            nao.session.service("ALAutonomousLife").then(nao.StartLifeSystem,nao.error);
           
        }, function () {
            console.log("disconnected");
        }, address);

    },
    error:function(error){console.log("An error occurred:", error)},

    
    StartSystem:function(system){nao.system = system; nao.log("System Started")},
    StartMotionSystem:function(motion){nao.motion = motion;nao.log("Motion ok");},
    StartPostureSystem:function(posture){nao.posture = posture;nao.log("Posture ok");},
    StartVideoSystem:function(video){nao.video = video;nao.log("Video ok");},
    StartBehaviourService: function (bm) {nao.behaviourManager = bm;nao.log("Behaviour ok");},
    StartAnimatedSpeechService: function (tts) { nao.animatedSay = tts;nao.log("Animated Speech ok")},
    StartLifeSystem: function (life) { nao.life = life;nao.log("Auto Life ok")},
    log: function (output) {if(nao.debug){console.log(output)}},

    
    
}