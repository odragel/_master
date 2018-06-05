export class Timer{
    constructor(){
        this.startTime = new Date();
        this.seconds ="00";
        this.minutes ="00";
        this.hours ="00";
    }

    getIdTimer(){
        return this.idTimer;
    }

    setIdTimer(idValue){
        this.idTimer = idValue;
    }

    getValue(){
        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }

    setValue(hours, minutes, seconds){
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
    }

    getStartTime(){
        return this.startTime;
    }

}