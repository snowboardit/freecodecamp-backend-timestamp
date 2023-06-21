const _ = require("lodash");

class DateHandler {
  #date;
  #unix;
  #utc;

  constructor(dateParam) {
    const isValid = this.isDateValid(dateParam)

    if (isValid) {
      this.setDates(dateParam);
    } else {
      return this.getError()
    }
  }

  isDateUnix(dateParam) {
    const dateNum = Number(dateParam);
    return Number.isInteger(dateNum) && dateNum > 1000000000000;
  }

  isDateUTC(dateParam) {
    const utcDate = new Date(dateParam),
      stringDate = utcDate.toString();
    return stringDate !== 'Invalid Date'
      ? true
      : false
  }

  isDateValid(dateParam) {
    const isDateUnix = this.isDateUnix(dateParam),
      isDateUTC = this.isDateUTC(dateParam)

    return isDateUnix || isDateUTC;
  }

  setDates(dateParam) {
    if (this.isDateUnix(dateParam)) {
      this.#date = new Date(Number(dateParam));
      this.#unix = this.#date.getTime();
      this.#utc = this.#date.toUTCString();
    } else {
      this.#date = new Date(dateParam);
      this.#unix = this.#date.getTime();
      this.#utc = this.#date.toUTCString();
    }
  }

  getReturner() {
    return {
      unix: this.#unix,
      utc: this.#utc,
    };
  }

  static getCurrentReturner() {
    const unix = Date.now(),
      utc = new Date().toString()
    return {
      unix,
      utc
    }
  }

  getError() {
    return new Error("Invalid date");
  }
}

module.exports = DateHandler;
