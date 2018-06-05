import * as THEME from "../constants/themes";
import {GameController} from "./GameController";
import {TimerController} from "./TimerController";
import {GameView} from "../view/GameView";
import {MainView} from "../view/MainView";
import {TimerView} from "../view/TimerView";
import {Timer} from "../model/Timer";
import {User} from "../model/User";

import * as LEVELS from "../constants/levels";
import {Game} from "../model/Game";

export class MainController{
    constructor(){
        this.mainView = new MainView();
        this.init();
    }

    init(){
        this.addListeners();
    }

    addListeners(){
        this.mainView.btnStart.addEventListener('click', this.showRegistration.bind(this));
        this.mainView.btnRegisterPlayer.addEventListener('click', this.registerUser.bind(this));
        this.mainView.btnNewGame.addEventListener('click', this.startGame.bind(this));

        this.mainView.linkNewUser.addEventListener('click',  this.returnToRegistration.bind(this));
        this.mainView.linkNewGame.addEventListener('click',  this.returnToSelectGame.bind(this));
    }

    showRegistration(){
        this.mainView.showRegistration();
    };

    returnToRegistration(){
        if(this.curGameController){
            this.curGameController.destroy();
        }

        this.mainView.returnToRegistration();
    }


    showSelectGame(){
        this.mainView.showSelectGame();
     }

     returnToSelectGame(){
         this.curGameController.destroy();
         this.mainView.showOnlySelectGame();
     }

    showGame(){
        this.mainView.showGame();
    }

    registerUser(e){
       if(this.mainView.registrationForm.checkValidity()){

           e.preventDefault();

           let firstName = this.mainView.regFirstName;
           let lastName = this.mainView.regLastName;
           let email = this.mainView.regEmail;

           this.curUser = new User(firstName.value, lastName.value, email.value);
           this.mainView.updateUser(this.curUser.getFullName());

           this.mainView.showSelectGame();

       }
    }

    startGame(){
        let gameImage = this.mainView.getCheckedImage();
        let gameLevel = this.mainView.gameLevel;

        let curLevel, cardBack;

        switch(gameLevel.selectedIndex){
            case 0:
                curLevel = LEVELS.LOW_LV;
                break;
            case 1:
                curLevel = LEVELS.MID_LV;
                break;
            case 2:
                curLevel = LEVELS.HIGH_LV;
        }

        switch(gameImage.value){
            case "0":
                cardBack = THEME.PAW_PATROL.back[0];
                break;
            case "1":
                cardBack = THEME.PAW_PATROL.back[1];
                break;
        }

        this.mainView.showGame(curLevel);

        let curTimer = new Timer();
        let curTimerView = new TimerView(curTimer);
        this.curTimerController = new TimerController(curTimer, curTimerView);
        this.curTimerController.startTimer();

        let curGame = new Game(curLevel, THEME.PAW_PATROL, cardBack, this.curUser, curTimer);
        let curGameView = new GameView(curGame);
        curGameView.init();

        this.curGameController = new GameController(curGame, curGameView, this.curTimerController);
        this.curGameController.initListeners();
        this.curGameController.shuffle();
    }


}