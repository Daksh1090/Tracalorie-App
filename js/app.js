
class TrackCalorie {
  constructor() {
   
    // This the example of space beetwen number with arrayss
    this._displayCalorieTotal()
    this._displayCalorieLimit()
    this._displayCalorieConsumed()
    this._displayCalorieBurned()
    this._daisplayCalorieRemaining()
  }


  // public Methods
  addCalorie(meal){
    this.meal.push(meal);
    this._totalCalorie += meal.cal
    console.log(this.meal)
    // console.log(this._totalCalorie)
    this._render()
  }

  addWork(work){
    this.work.push(work);
    this._totalCalorie -= work.cal;
    // console.log(this.work)
    // console.log(this._totalCalorie)
   this._render()
  }


  // Private Methods
  _displayCalorieTotal(){
    const totalCalorie = document.getElementById('calories-total')
    totalCalorie.innerHTML = this._totalCalorie;
  }

  _displayCalorieLimit(){
    const totalCalorie = document.getElementById('calories-limit')
    totalCalorie.innerHTML = this._calorieLimit;
  }

  _displayCalorieConsumed(){
    const calorieConsumed = document.getElementById('calories-consumed');
    let calorie = 0;
    this.meal.forEach(cal => {
      calorie += cal.cal
    })
    calorieConsumed.innerHTML = calorie;
    return calorie;
  }

  _displayCalorieBurned(){
    const calorieBurned = document.getElementById('calories-burned');
    let calorie = 0;
    this.work.forEach(cal => {
      calorie += cal.cal
    })
    calorieBurned.innerHTML = calorie;
    return calorie;
  }

  _daisplayCalorieRemaining(){
    const calBurn = this._displayCalorieBurned();
    const calconsumed = this._displayCalorieConsumed();
    const calRemains = this._calorieLimit - (calBurn + calconsumed)
    document.getElementById('calories-remaining').innerHTML = calRemains
  }

  _render(){
    this._displayCalorieTotal()
    this._displayCalorieConsumed()
    this._displayCalorieBurned()
    this._daisplayCalorieRemaining()
  }
}


class Meal {
  constructor(meal,cal){
    this.meal = meal;
    this.cal = cal;
  }
}

class Work{
  constructor(work,cal){
    this.work = work;
    this.cal = cal;
  }
}

const meal = new Meal('mamra', 300);
const meal2 = new Meal('mamra', 400);
const tracker = new TrackCalorie();
tracker.addCalorie(meal)
tracker.addCalorie(meal2)

const work = new Work('Push-up', 200)
tracker.addWork(work)


