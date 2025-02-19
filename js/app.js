class TrackCalorie {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalorie = 0
    this.meal = []
    this.work = []

    
    this._displayCalorieTotal()
    this._displayCalorieLimit()
    this._displayCalorieConsumed()
    this._displayCalorieBurned()
    this._daisplayCalorieRemaining()
    this._displayCalorieProgress()
    // this._daiplayNewMeal(this.meal)
  }


  // public Methods
  addCalorie(meal){
    this.meal.push(meal);
    this._totalCalorie += meal.cal
    this._daiplayNewMeal(meal)
    this._render()
    // console.log(this.meal)
  }

  addWork(work){
    this.work.push(work);
    this._totalCalorie -= work.cal;
    this._daiplayNewWork(work)
   this._render()
  }

  removeMeal(id){
    const index = this.meal.findIndex((meal) => meal.id === id)

    if(index != -1){
      const meal = this.meal[index]
      this._totalCalorie -= meal.cal
      this.meal.splice(index,1)
      this._render()
    }
  }

  removeWork(id){
    const index = this.work.findIndex((work) => work.id === id)

    if(index != -1){
      const work = this.work[index]
      this._totalCalorie += work.cal
      this.work.splice(index,1)
      this._render()
    }
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
  }

  _displayCalorieBurned(){
    const calorieBurned = document.getElementById('calories-burned');
    let calorie = 0;
    this.work.forEach(cal => {
      calorie += cal.cal
    })
    calorieBurned.innerHTML = calorie;
  }

  _daisplayCalorieRemaining(){
    const calRemains = this._calorieLimit - this._totalCalorie

    const progressBar = document.getElementById('calorie-progress')
   const calRemainsText = document.getElementById('calories-remaining')
   calRemainsText.innerHTML = calRemains

    if(calRemains <= 0){
      calRemainsText.parentElement.parentElement.classList.remove('bg-light')
      calRemainsText.parentElement.parentElement.classList.add('bg-danger')
      progressBar.classList.add('bg-danger')
    }else{
      calRemainsText.parentElement.parentElement.classList.replace('bg-danger', 'bg-light')
      progressBar.classList.remove('bg-danger')
    }
  }

  _displayCalorieProgress(){
    const persentage = (this._totalCalorie / this._calorieLimit) * 100
    
    const width = Math.min(persentage,100)
    const progressBar = document.getElementById('calorie-progress');
    progressBar.style.width = `${width}%`
  }

  _daiplayNewMeal(meal){
    const mealItems = document.getElementById('meal-items');

      const mlItem = document.createElement('div')
      mlItem.classList.add('card','my-2')
      mlItem.setAttribute('item-id',meal.id)
    // console.log('first'+ meal.meal)
    mlItem.innerHTML = `
     <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.meal}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.cal}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>`

    mealItems.appendChild(mlItem)
    
  }

  _daiplayNewWork(workout){
    const workoutItems = document.getElementById('workout-items');

      const wrItem = document.createElement('div')
      wrItem.classList.add('card','my-2')
      wrItem.setAttribute('item-id', workout.id)
    // console.log('first'+ workout.workout)
    wrItem.innerHTML = `
     <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.work}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.cal}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>`

    workoutItems.appendChild(wrItem)
    
  }


  _render(){
    this._displayCalorieTotal()
    this._displayCalorieConsumed()
    this._displayCalorieBurned()
    this._daisplayCalorieRemaining()
    this._displayCalorieProgress()
  }
}


class Meal {
  constructor(meal,cal){
    this.id = Math.random().toString(16).slice(2)
    this.meal = meal;
    this.cal = cal;
  }
}


class Work{
  constructor(work,cal){
    this.id = Math.random().toString(16).slice(2)
    this.work = work;
    this.cal = cal;
  }
}


class App {
  constructor(){
    this._tracker = new TrackCalorie();

    document.getElementById('meal-form')
    .addEventListener('submit',this._newItem.bind(this, 'meal'))
    document.getElementById('workout-form')
    .addEventListener('submit',this._newItem.bind(this, 'workout'))

    document.getElementById('meal-items').addEventListener('click', this._removeMeal.bind(this, 'meal'))

    document.getElementById('workout-items').addEventListener('click', this._removeMeal.bind(this, 'workout'))
  }

  _newItem(type, e){
    e.preventDefault();

    const  Name = document.getElementById(`${type}-name`)
    const  Calorie = document.getElementById(`${type}-calories`)

    if(Name.value === '' || Calorie.value === ''){
      alert("Please Enter Value First")
      return
    }
    
    if(type === 'meal'){
      const meal = new Meal(Name.value, +Calorie.value)
      this._tracker.addCalorie(meal)
      
    }else{
      const work = new Work(Name.value, +Calorie.value)
      this._tracker.addWork(work)
    }
    
    Calorie.value = ''
    Name.value = ''
    }
  
    _removeMeal(type ,e){
      if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
        if(confirm('Are You Sure?')){
          const id = e.target.closest('.card').getAttribute('item-id')
          type == 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWork(id)
          e.target.closest('.card').remove()
        }
      }
  }
}
const app = new App()