document.getElementById('formPicoPlaca').addEventListener('submit', consultCarOnTheRoad);

function consultCarOnTheRoad(e){
    
    //DATA
    let licensePlate = document.getElementById('licensePlate').value;
    let date = document.getElementById('date').value;
    let hour = document.getElementById('hour').value;

    //OBJECT CAR
    const dataCar = {
        licensePlate,
        date,
        hour
    };

    //CHECK DATE
    if(checkFormatDate(dataCar.date)){
        if(existDate(dataCar.date)){
            //CHECK TIME
            if (CheckTime(dataCar.hour))
            {
                //GET DIGIT
                let digit = lastDigit(dataCar.licensePlate);
                if (digit==="NO")
                {
                    writeMessage("Wrong License Plate");
                }
                else
                {
                    //CHECK PASS
                    //DATE
                    var dateEnd = dataCar.date.split("/");
                    var objDate = new Date(parseInt(dateEnd[2]),parseInt(dateEnd[0])-1,parseInt(dateEnd[1]));

                    //DAY OF WEEK
                    var dayOfWeek = objDate.getDay();
                    //HOUR
                    var hourEnd = dataCar.hour.split(":");
                    objDate.setHours(hourEnd[0]);
                    objDate.setMinutes(hourEnd[1]);
                    //INTERVALS
                    var interval1 = new Date(parseInt(dateEnd[2]),parseInt(dateEnd[0])-1,parseInt(dateEnd[1]));
                    interval1.setHours(7);
                    interval1.setMinutes(0);
                    var interval2 = new Date(parseInt(dateEnd[2]),parseInt(dateEnd[0])-1,parseInt(dateEnd[1]));
                    interval2.setHours(9);
                    interval2.setMinutes(30);
                    var interval3 = new Date(parseInt(dateEnd[2]),parseInt(dateEnd[0])-1,parseInt(dateEnd[1]));
                    interval3.setHours(16);
                    interval3.setMinutes(0);
                    var interval4 = new Date(parseInt(dateEnd[2]),parseInt(dateEnd[0])-1,parseInt(dateEnd[1]));
                    interval4.setHours(19);
                    interval4.setMinutes(30);
                    //COMPARISON   
                    if ((objDate >= interval1 && objDate <= interval2) ||
                    (objDate >= interval3 && objDate <= interval4))
                    {
                        //MONDAY
                        if (dayOfWeek == 1 && (digit == 1 || digit == 2)) 
                            writeMessage("That vehicle can not be on the road!!!") 
                            else
                            {
                                //TUESDAY
                                if (dayOfWeek == 2 && (digit == 3 || digit == 4)) 
                                    writeMessage("That vehicle can not be on the road!!!");
                                else 
                                {
                                    //WEDNESDAY
                                    if (dayOfWeek == 3 && (digit == 5 || digit == 6)) 
                                        writeMessage("That vehicle can not be on the road!!!");
                                    else
                                    {
                                        //THURSDAY
                                        if (dayOfWeek == 4 && (digit == 7 || digit == 8)) 
                                            writeMessage("That vehicle can not be on the road!!!");
                                        else
                                        {
                                            //FRIDAY
                                            if (dayOfWeek == 5 && (digit == 9 || digit == 0)) 
                                                writeMessage("That vehicle can not be on the road!!!");
                                            //OTHER DAY
                                            else
                                                writeMessage("That vehicle can be on the road!!!");
                                        }
                                    }
                                }
                            }
                    }
                    else
                    {
                        writeMessage("That vehicle can be on the road!!!");
                    }
                }
            }
            else
            {
                writeMessage("Wrong Time");
            }
        }else{
            writeMessage("Wrong Date");
        }
    }else{
        writeMessage("Wrong Format Date");
    }
    //PREVENT RE-LOAD
    e.preventDefault();
}

function writeMessage(m){
    let message = document.getElementById('message');
    let title = m;
    //CLEAR
    message.innerHTML = '';
    //MESSAGE
    message.innerHTML += `<div class="card">
            <div class="card-body">
                <p>${title}</p>
            </div>
        </div>`
}

function CheckTime(str)
{
    //TIME
	hour=str;
	if (hour.length!=5) {
		return false;
	}
	a=hour.charAt(0); //<=2
	b=hour.charAt(1); //<4
	c=hour.charAt(2); //:
	d=hour.charAt(3); //<=5
	if ((a==2 && b>3) || (a>2)) {
		return false;
	}
	if (d>5) {
		return false;
	}
	if (c!=':') {
		return false;
    }
    //DEFAULT
    return true;
}

function checkFormatDate(dateToCheck) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((dateToCheck.match(RegExPattern)) && (dateToCheck!='')) {
          return true;
    } else {
          return false;
    }
}

function existDate (dateTest) {
    var dateEnd = dateTest.split("/");
    var m = dateEnd[0];//MONTH
    var d = dateEnd[1];//DAY
    var y = dateEnd[2];//YEAR
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function lastDigit (data){
    var str = data.split('').reverse();
    var carDigit = str[0];
    var motorCycleDigit = str[1];
    var RegExPattern = /^[0-9]$/;
    if ((carDigit.match(RegExPattern)) && (carDigit!='')) {
        return carDigit;
    } else {
        if ((motorCycleDigit.match(RegExPattern)) && (motorCycleDigit!='')) {
            return motorCycleDigit;
        } else {
            return "NO";
        }
    }

}