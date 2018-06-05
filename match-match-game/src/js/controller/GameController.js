import * as LEVELS from "../constants/levels";
import {Utils} from "../utils/Utils";

export class GameController{
    constructor(model, view, timerController){
        this.model = model;
        this.view = view;
        this.timerController = timerController;
    }

    initListeners(){
        this.view.gameTable.addEventListener('click', this.clickCard.bind(this));
    }

    clickCard(e){
        if(this.view.isCard(e.target)){
            if (this.model.openedCards < 2) {
                let card = e.target.parentElement.parentElement;

                if(!card.data){
                    this.view.cardView.addClickedData(card);
                    this.view.cardView.openCard(card);

                    this.model.openedCards++;
                    if(this.model.openedCards === 2) {
                        let openedCards = this.view.getOpenedCards();
                        if (openedCards[0].firstChild.getAttribute('src') === openedCards[1].firstChild.getAttribute('src')) {
                            setTimeout(this.deletePair.bind(this, openedCards), 500);
                        } else {
                            setTimeout(this.closePair.bind(this, openedCards), 500);
                        }
                    }
                }

            }
        }
    }

    closePair(openedCards){
        openedCards.forEach(
            (cur) => {
                    this.view.cardView.closeCard(cur.parentNode);
                    this.model.openedCards = 0;
                    this.view.cardView.removeClickedData(cur.parentNode);

            }
        )
    }

    deletePair(openedCards){
        openedCards.forEach(
            (cur) => {
                this.view.cardView.hideCard(cur.parentNode);
            }
        );
        this.model.leftPairs--;
        this.model.openedCards = 0;
        this.checkFinal();
    }

    shuffle(){
        let resultArr=[];

        if(this.model.level < LEVELS.HIGH_LV){
            //determine which cards will be used
            let tempSet = new Set();
            let amountOfPairs = this.model.leftPairs;

            while(amountOfPairs > 0){
                let temp = Utils.getRandomInt(LEVELS.HIGH_LV - 1);

                while(tempSet.has(temp)){
                    temp = Utils.getRandomInt(LEVELS.HIGH_LV - 1);
                    console.log(temp);
                }

                tempSet.add(temp);
                resultArr.push(this.model.theme.images[temp]);
                resultArr.push(this.model.theme.images[temp]);
                amountOfPairs--;
            }

        }else{
            this.model.theme.images.forEach(function(cur){
                resultArr.push(cur);
                resultArr.push(cur);
            });

        }

        resultArr.forEach((cur, index) => {
            var newIndex = Math.floor(Math.random() * Math.floor(resultArr.length - 1));
            [resultArr[index], resultArr[newIndex]] =[resultArr[newIndex], resultArr[index]] ;
        });

        this.model.cards = resultArr;
        this.view.updateTable();

    }

    checkFinal(){
        console.log("this.model.leftPairs="+this.model.leftPairs);

        if (this.model.leftPairs == 0){
            console.log("final");

             this.model.results = {
                timer: this.model.timer.getValue(),
                user: this.model.user.getFullName(),
                level: this.model.level
            };
            this.destroy();
            let results = this.analyzeResults(this.model.results)
            this.view.showCongratulations(results);

            this.model = null;
            this.view = null;
        }
    }

    analyzeResults(curResult){
        let savedResults = JSON.parse(window.localStorage.getItem('scores'));

        if(!savedResults){
            savedResults = [];
            savedResults.push(curResult);
            window.localStorage.setItem('scores', JSON.stringify(savedResults));

        } else{
            savedResults = JSON.parse(window.localStorage.getItem('scores'));
            let isInserted=0;
            for(let i = 0; i < savedResults.length; i++){
                if(savedResults[i].level < curResult.level){
                    savedResults.splice(i, 0, curResult);
                    isInserted = 1;
                    break;
                } else if(savedResults[i].level === curResult.level){
                    if(Utils.isCurResultBetter(curResult.timer, savedResults[i].timer)){
                        savedResults.splice(i, 0, curResult);
                        isInserted = 1;
                        break;
                    }
                }
            }
            if(!isInserted){
                savedResults.push(curResult);
            }

            //we save only first 10 results
            if(savedResults.length > 10){
                savedResults = savedResults.slice(0, 10);

            }
            window.localStorage.setItem('scores', JSON.stringify(savedResults));
        }
        return savedResults;
    }

    destroy(){
        this.timerController.stopTimer();
    }
}