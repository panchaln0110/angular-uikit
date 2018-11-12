import {Injectable} from '@angular/core';
import {
  DateObj,
  DefaultLocaleMonths,
  DefaultLocaleMonthsShort,
  DefaultLocaleWeekdays,
  DefaultLocaleWeekdaysShort
} from './datepicker.interface';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {
  get dateObj(): Date {
    return this._dateObj;
  }

  set dateObj(value: Date) {
    this._dateObj = value;
  }
  private _dateObj: Date;

  constructor() {
  }

  getDatesOfMonth() {
    const d = this.dateObj, y = d.getFullYear(), m = d.getMonth();
    const f = new Date(y, m, 1);
    const l = new Date(y, m + 1, 0);

    const weekArr = new Array(7);
    const days = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ];
    console.log(l.getDate());
    let c = f.getDay();
    let row = 0;
    for (let i = 1; i <= l.getDate(); i++) {
      days[row][c] = (i <= 9) ? '0' + i : i + '';
      c++;
      if (c === 7) {
        row++;
        c = 0;
      }
    }
    console.log(row, days);
    return days;
  }

  getDateJsonObj(year, month, day, hours, minutes, seconds): DateObj {
    this.dateObj = new Date(year, month, day, hours, minutes, seconds);
    const d = this.dateObj;
    return {
      day: d.getDay(),
      dayString: DefaultLocaleWeekdays[d.getDay()],
      dayStringShort: DefaultLocaleWeekdaysShort[d.getDay()],
      date: d.getDate(),
      month: d.getMonth(),
      monthString: DefaultLocaleMonths[d.getUTCMonth()],
      monthStringShort: DefaultLocaleMonthsShort[d.getUTCMonth()],
      time: d.getTime().toString(),
      hours: d.getHours().toString(),
      minutes: d.getMinutes().toString(),
      seconds: d.getSeconds().toString(),
      year: d.getFullYear().toString(),
      UTCString: d.toUTCString()
    };
  }
}