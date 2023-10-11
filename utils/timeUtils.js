import moment from 'moment';

export function agencyAtmTimeToString(schedule) {
  //Lun-Vie%HH:mm%HH:mm,Mie%HH:mm%HH:mm
  if(schedule.length === 0) return [];
  let res = [];
  let daysInterval = schedule.split(',');
  for(let interval in daysInterval) {
    let intervalSections = daysInterval[interval].split('%');
    let days = intervalSections[0].split('-');
    let daysString = days.length === 1 ? daysMap[days[0]] : daysMap[days[0]] + " a " + daysMap[days[1]];
    let timeIntervalString = "";
    for(let i = 1; i < intervalSections.length; i+=2) {
      timeIntervalString += intervalSections[i] + " a " + intervalSections[i+1]+" ";
    }
    res.push(daysString + " " + timeIntervalString);
  }
  return res;
}

export function agencyAtmTimeToChunkString(schedule) {
  let res = [];
  let daysInterval = schedule.split(',');
  for(let interval in daysInterval) {
    let intervalSections = daysInterval[interval].split('%');
    let days = intervalSections[0].split('-');
    let daysString = days.length === 1 ? days[0] : days[0] + " - " + days[1];
    let timeIntervalString = "";
    for(let i = 1; i < intervalSections.length; i+=2) {
      timeIntervalString += intervalSections[i] + " a " + intervalSections[i+1];
      if (i < intervalSections.length - 2) timeIntervalString += " - ";
    }
    res.push(daysString + "," + timeIntervalString);
  }

  return res;
}

export function todayClosingTime(chunkString) {
  const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  let res = {};

  for (let p of chunkString) {
    let daySection = p.split(','); // Separa los dias de las horas
    let closingTime = p.substring(p.length - 5, p.length); // Devuelve los ultimos 5 caract. de la hora. exm: 23:00

    let daysInterval = daySection[0].split('-');

    daysInterval = daysInterval.map((x) => x.trim());  // quita espacios y devuelve array con los intervalos de horarios en comun e individuales

    if (daysInterval.length > 1) {

      let b = p.indexOf(daysInterval[0]);
      let e = p.indexOf(daysInterval[1]);

      for (let i = b; i <= e; i++) {
        res[days[i]] = closingTime;
      }

    } else {
      res[daysInterval[0]] = closingTime;
    }

  }
  let todayShort;

  if(moment().weekday() === 0) {
    todayShort = days[6];
  } else {
    todayShort = days[moment().weekday() - 1];
  }  
 
  return res[todayShort]; // Devuelve la hora de cierre del dia en curso.
}

export function todayOpenTime(chunkString) {
  const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  let res = {};

  for (let p of chunkString) {
    let daySection = p.split(','); // Separa los dias de las horas
    
    let openTime = daySection[1].slice(0, 5) // Devuelve la hora de apertura

    let daysInterval = daySection[0].split('-');

    daysInterval = daysInterval.map((x) => x.trim());  // quita espacios y devuelve array con los intervalos de horarios en comun e individuales

    if (daysInterval.length > 1) {

      let b = p.indexOf(daysInterval[0]);
      let e = p.indexOf(daysInterval[1]);

      for (let i = b; i <= e; i++) {
        res[days[i]] = openTime;
      }

    } else {
      res[daysInterval[0]] = openTime;
    }

  }
  let todayShort;
  // console.log(res);
  if(moment().weekday() === 0) {
    todayShort = days[6];
  } else {
    todayShort = days[moment().weekday() - 1];
  }  
 
  return res[todayShort]; // Devuelve la hora de  apertura del dia en curso.
}

export function getIsOpenCms(horario) {
  horario = JSON.parse(horario)
  let values = Object.values(horario)
  values = values.map((e) => {
      if (e.length > 1) {
          return e = true
      }

      if (e.length === 1) {
          return e[0]["isOpen"]
      }
  })
  return values[moment().weekday() - 1]
}

export function getCurrentTimeState(chunkString) {
  console.log(chunkString)
  const closingHour = todayClosingTime(chunkString);
  const openHour = todayOpenTime(chunkString)
  const openTime = moment(openHour, 'HH:mm');
  const closingTime = moment(closingHour, 'HH:mm');
  const almostClosingTime = moment(closingHour, 'HH:mm').subtract(1, 'hour');
  if (moment().isBefore(almostClosingTime) && moment().isAfter(openTime)) return 'Abierto';
  if (moment().isBefore(closingTime) && moment().isAfter(openTime)) return 'Cierra pronto';
  return 'Cerrado';
}

const daysMap = {
  "Lun": "Lunes",
  "Mar": "Martes",
  "Mie": "Miércoles",
  "Jue": "Jueves",
  "Vie": "Viernes",
  "Sab": "Sábado",
  "Dom": "Domingo"
};

export function objectToOldFormat(scheduleString) {
  let schedule = JSON.parse(scheduleString);
  //console.log('Parsed time: ',schedule);
  let scheduleSignature = [];
  let lastDaySignature = [];
  for (const [key, value] of Object.entries(keysMap)) {
    //console.log('KEY: ',key, 'value: ',value);
    let daySchedule = schedule[key];
    //console.log('Day schedule: ',daySchedule);
    let dayName = value;
    let daySignature = [];
    let isDayClosed = false;
    let isWholeDay = false;
    for(let i in daySchedule) {
      dayName = i === (0).toString() ? dayName+"%" : "";
      if(daySchedule[i]['isOpen'] === false) {
        isDayClosed = true;
        break;
      }
      let open = formatTime(daySchedule[i]['open']);
      let close = formatTime(daySchedule[i]['close']);
      if(daySchedule[i]['open']==="24hrs") {
        open = "00:00";
        close = "23:59";
      }
      let signature = dayName + open + "%" + close;
      daySignature.push(signature);
    }
    if(isDayClosed) continue;
    //console.log('Day signature: ',daySignature, 'lastDaySignature ',lastDaySignature);
    if(areSignaturesEqual(daySignature,lastDaySignature)) {
      //console.log('Day signature is repeated with last one');
      let dayOfCurrentSignature = daySignature[0].split('%')[0];
      let dayOfLastSignature = lastDaySignature[0].split('%')[0];
      let newDaysInterval = getFirstDayOfDaySignature(dayOfLastSignature) + "-" + getFirstDayOfDaySignature(dayOfCurrentSignature);
      let timeIntervals = daySignature[0].split('%').slice(1).join('%');
      //console.log('News days interval: ',newDaysInterval, 'and time : ',timeIntervals);
      let newDayPositionInSignature = newDaysInterval + "%" + timeIntervals;
      daySignature[0] = newDayPositionInSignature;
      scheduleSignature.pop();
      //console.log('DAYSIGNAUTRE TO ADD ',daySignature);
      scheduleSignature.push(daySignature.join('%'));
    } else {
      //console.log('Day signature is new');
      scheduleSignature.push(daySignature.join('%'));
    }
    lastDaySignature = daySignature;
  }
  let res = scheduleSignature.join(',');
  //console.log('WHOLE SIGNATURE: ',res);
  return res;
}

const keysMap = {
  "monday": "Lun",
  "tuesday": "Mar",
  "wednesday": "Mie",
  "thursday": "Jue",
  "friday": "Vie",
  "saturday": "Sab",
  "sunday": "Dom"
};

function formatTime(time) {
  let hour = time.substring(0,2);
  let min = time.substring(2,4);
  return hour+":"+min;
}

function getFirstDayOfDaySignature(days) {
  let daysArray = days.split('-');
  return daysArray[0];
}

function areSignaturesEqual(sig1, sig2) {
  if(sig1.length !== sig2.length) return false;
  let timeOfCurrentSignature = sig1[0].split('%').slice(1).join('%');
  let timeOfLastSignature = sig2[0].split('%').slice(1).join('%');
  //console.log('time 1: ',timeOfCurrentSignature,timeOfLastSignature);
  if(timeOfCurrentSignature !== timeOfLastSignature) return false;
  let otherTime1 = sig1.slice(1).join('%');
  let otherTime2 = sig1.slice(1).join('%');
  //console.log('time 2: ',otherTime1,otherTime2);
  if(otherTime1 !== otherTime2) return false;
  return true;
}
