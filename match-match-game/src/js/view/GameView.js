import {CardView} from "./CardView";

export class GameView{
    constructor(model){
        this.model = model;
    }

    init(){
        this.gameTable = document.querySelector('.game-table');
        this.gameCongratulations = document.querySelector('.game-congratulations');
        this.gameSection = document.querySelector('.game');
        this.score = document.querySelector('#score-content');
        this.score.innerHTML='';

        this.cardView = new CardView();
    }

    updateTable() {
        this.gameTable.innerHTML = '';
        let amountOfCards = this.model.level * 2;

        for (let i = 0; i < amountOfCards; i++) {
          let card = this.cardView.createCard(this.model.cards[i], this.model.back);
            this.gameTable.appendChild(card);
        }
    }

    getOpenedCards(){
        return document.querySelectorAll(".opened-card .front");
    }

    isCard(element){
        return element.classList.contains('img-card');
    }

    showCongratulations(scores){
        this.gameSection.classList.remove('block-display')
        this.gameSection.classList.add('not-displayed');

        this.gameCongratulations.classList.remove('not-displayed')
        this.gameCongratulations.classList.add('block-display');


        scores.forEach((cur) => {
            let span1 = document.createElement('span');
            span1.textContent = cur.user;

            let span2 = document.createElement('span');
            span2.textContent = cur.level;

            let span3 = document.createElement('span');
            span3.textContent = cur.timer;

            this.score.appendChild(span1);
            this.score.appendChild(span2);
            this.score.appendChild(span3);

        });

    }

}