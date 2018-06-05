export class TimerView{
    constructor(model){
        this.timerValue = document.querySelector('.timer-value');
        this.timerValue.textContent = model.getValue();
    }

    update(model){
        this.timerValue.textContent = model.getValue();
    }

}