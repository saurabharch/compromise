const spacetime = require('spacetime')
const Unit = require('./Unit')

class Day extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
  }
}
class Week extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
  }
}
class Month extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'month'
  }
}
class Quarter extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'quarter'
  }
}
class Season extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'season'
  }
}
class Year extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'year'
  }
}
class Hour extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'hour'
  }
}
class Minute extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'minute'
  }
}
class WeekDay extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
    // is the input just a weekday?
    if (typeof input === 'string') {
      this.d = spacetime(context.today, context.timezone)
      this.d = this.d.day(input)
      // assume a wednesday in the future
      if (this.d.isBefore(context.today)) {
        this.d = this.d.add(7, 'days')
      }
    } else {
      this.d = input
    }
    this.weekDay = this.d.dayName()
  }
  clone() {
    //overloaded method
    return new WeekDay(this.d, this.unit, this.context)
  }
  end() {
    //overloaded method
    this.d = this.d.endOf('day')
    return this
  }
  next() {
    this.d = this.d.add(7, 'days')
    this.d = this.d.day(this.weekDay)
    return this
  }
  last() {
    this.d = this.d.minus(7, 'days')
    this.d = this.d.day(this.weekDay)
    return this
  }
}
//may need some work
class WeekEnd extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
  }
  start() {
    this.d = this.d.day('saturday').startOf('day')
    return this
  }
  end() {
    this.d = this.d.day('sunday').endOf('day')
    return this
  }
}

// like 'feb 2'
class CalendarDate extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
  }
  next() {
    this.d = this.d.add(1, 'year')
    return this
  }
  last() {
    this.d = this.d.minus(1, 'year')
    return this
  }
}

module.exports = {
  Unit: Unit,
  Day: Day,
  Week: Week,
  Hour: Hour,
  Minute: Minute,
  Month: Month,
  Quarter: Quarter,
  Season: Season,
  Year: Year,
  WeekDay: WeekDay,
  WeekEnd: WeekEnd,
  CalendarDate: CalendarDate,
}
