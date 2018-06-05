import * as LEVELS from "../constants/levels";

export class MainView{
    constructor(){
        this.init();
    }

    init(){
        this.sectionGreeting = document.querySelector('.greeting');
        this.btnStart = document.querySelector('#idBtnStart');

        this.sectionRegistration = document.querySelector('.registration');
        this.registrationForm = document.querySelector('#registration-form');
        this.regFirstName = document.querySelector('#firstName');
        this.regLastName = document.querySelector('#lastName');
        this.regEmail = document.querySelector('#email');
        this.btnRegisterPlayer = document.querySelector('#idBtnNewPlayer');

        this.user = document.querySelector('#registeredUser');
        this.linkNewUser = document.querySelector('#toNewPlayer');
        this.linkNewGame = document.querySelector('#toNewGame');

        this.sectionWholeGame = document.querySelector('.whole-game');
        this.sectionSelectGame = document.querySelector('.select-game');
        this.gameLevel = document.querySelector('.game-level');
        this.btnNewGame = document.querySelector('#idBtnNewGame');

        this.sectionGame = document.querySelector('.game');
        this.gameTable = document.querySelector('.game-table');
        this.sectionCongratulations = document.querySelector('.game-congratulations');
    }

    getCheckedImage() {
        return document.querySelector(':checked');
    }

    showRegistration(){
        this.sectionGreeting.classList.add('not-displayed');
        this.sectionRegistration.classList.add('block-display');
    }

    returnToRegistration(){
        if(!this.sectionRegistration.classList.contains('block-display')){
            this.sectionRegistration.classList.add('block-display');

            this.sectionWholeGame.classList.remove('block-display');
            this.sectionWholeGame.classList.add('not-displayed');

            if(!this.sectionSelectGame.classList.contains('not-displayed')){
                this.sectionSelectGame.classList.remove('block-display');
                this.sectionSelectGame.classList.add('not-displayed');
            }

            if(!this.sectionGame.classList.contains('not-displayed')){
                this.sectionGame.classList.remove('block-display');
                this.sectionGame.classList.add('not-displayed');
            }

            if(!this.sectionCongratulations.classList.contains('not-displayed')){
                this.sectionCongratulations.classList.remove('block-display');
                this.sectionCongratulations.classList.add('not-displayed');
            }

            if(this.gameTable.classList.length > 1){
                this.gameTable.classList.remove(this.gameTable.classList.item(1));
            }

        }
        this.emptyRegistrationSection();
    }

    emptyRegistrationSection(){
        this.regFirstName.value='';
        this.regLastName.value='';
        this.regEmail.value='';
    }


    showSelectGame(){
        this.sectionWholeGame.classList.remove('not-displayed');
        this.sectionWholeGame.classList.add('block-display');

        this.sectionRegistration.classList.remove('block-display');
        this.sectionRegistration.classList.add('not-displayed');

        this.sectionSelectGame.classList.remove('not-displayed');
    }

    showOnlySelectGame(){
        if(this.sectionSelectGame.classList.contains('not-displayed')){
            this.sectionSelectGame.classList.remove('not-displayed');

            if(this.sectionGame.classList.contains('block-display')){
                this.sectionGame.classList.remove('block-display');
                this.sectionGame.classList.add('not-displayed');
            }

            if(this.sectionCongratulations.classList.contains('block-display')){
                this.sectionCongratulations.classList.remove('block-display');
                this.sectionCongratulations.classList.add('not-displayed');
            }
            //remove class which determine the layout of cards
            this.gameTable.classList.remove(this.gameTable.classList.item(1));
        }
    }


    showGame(curLevel){
        console.log("showGame");

        this.sectionSelectGame.classList.remove('block-display');
        this.sectionSelectGame.classList.add('not-displayed');

        this.sectionGame.classList.remove('not-displayed');
        this.sectionGame.classList.add('block-display');

        this.gameTable = document.querySelector('.game-table');

        switch(curLevel) {
            case(LEVELS.LOW_LV):
                this.gameTable.classList.add('low-level');
                break;
            case(LEVELS.MID_LV):
                this.gameTable.classList.add('middle-level');
                break;
            case(LEVELS.HIGH_LV):
                this.gameTable.classList.add('middle-level');
        }

    }

    updateUser(fullName){
        this.user.textContent = fullName;
    }



}