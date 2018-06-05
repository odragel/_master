export class TimerController{
   constructor(model, view){
        this.model = model;
        this.view = view;
   }

    startTimer(){
        this.model.setIdTimer(setInterval(this.increaseTimer.bind(this), 1000));

    }

    increaseTimer() {
        let spendTime = new Date() - this.model.getStartTime();
        let seconds = Math.floor((spendTime / 1000) % 60);
        let minutes = Math.floor((spendTime / 1000 / 60) % 60);
        let hours = Math.floor((spendTime / (1000 * 60 * 60)) % 24);

        seconds = seconds <= 9 ? "0" + seconds : seconds;
        minutes = minutes <= 9 ? "0" + minutes : minutes;
        hours = hours <= 9 ? "0" + hours : hours;

        this.model.setValue(hours, minutes, seconds);
        this.view.update(this.model);
    }

    stopTimer(){
        clearInterval(this.model.idTimer);
    }

}