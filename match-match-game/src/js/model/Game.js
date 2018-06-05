export class Game{
    constructor(level, theme, back, user, timer){
        this.leftPairs = level;
        this.level = level;
        this.theme = theme;
        this.back = back;
        this.user = user;
        this.openedCards = 0;
        this.alreadyClicked='';
        this.timer = timer
        this.results ='';
    }

    getAlreadyClicked(){
        return this.alreadyClicked;
    }

    setAlreadyClicked(value){
        this.alreadyClicked = value;
    }

}