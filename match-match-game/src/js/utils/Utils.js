export class Utils{

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static isCurResultBetter(sTime1, sTime2){
        let time1 = sTime1.split(":");
        let time2 = sTime2.split(":")

        if(parseInt(time1[0]) > parseInt(time2[0])){
            //compare hours
            return false;
        } else if(parseInt(time1[1]) > parseInt(time2[1])){
            //compare minutes
            return false;
        } else if(parseInt(time1[2]) > parseInt(time2[2])){
            //compare seconds
            return false;
        }
        return true;
    }


}