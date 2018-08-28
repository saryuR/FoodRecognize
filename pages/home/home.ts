import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LifeRestProvider} from "../../providers/life-rest/life-rest";
import {FoodrecognizePage} from "../foodrecognize/foodrecognize";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  age;
  weight;
  sex;
  height;
  response:any;
  life_left;
  bmi;
  gaugeValue :any = 25;
  interval:any;
  bmi_cat;
  nextPage: any;
  constructor(public navCtrl: NavController, public lifeProvider: LifeRestProvider) {


  }
  ngOnInit() {
    this.nextPage = FoodrecognizePage;
    const updateValue = (): void => {
      this.gaugeValue = Math.round(Math.random() * 35);
    };
    const INTERVAL: number = 5000;
    this.interval = setInterval(updateValue, INTERVAL);
    updateValue();
  }
  calculateBmi(){
    this.bmi =Math.round(this.weight / Math.pow(this.height, 2));
    console.log(this.bmi);
    this.gaugeValue = this.bmi;
    clearInterval(this.interval);
    if(this.bmi < 15){

      this.bmi_cat = "very severely underweight";
    }
    else if(this.bmi >=15 && this.bmi <16){
      this.bmi_cat = "severely underweight";
    }
    else if(this.bmi >=16 && this.bmi <18.5){
      this.bmi_cat = "underweight";
    }
    else if(this.bmi >=18.5 && this.bmi <25){
      this.bmi_cat = "Congratulations, your BMI is Normal";
    }
    else if(this.bmi >=25 && this.bmi <30){
      this.bmi_cat = "overweight";
    }
    else if(this.bmi >=30 && this.bmi <35){
      this.bmi_cat = "severely obese";
    }
    else {
      this.bmi_cat = "very severely obese";
    }
  }
  showLife() {
    this.lifeProvider.lifeLeft(this.sex,this.age)
      .then(data => {
        this.response = data;
        this.life_left = Math.floor(this.response.remaining_life_expectancy);
        console.log(this.response);
      });
  }

  // sendDataToFood(sex, weight, height, age){
  //   sex = this.sex;
  //   weight = this.weight;
  //   height = this.height;
  //   age = this.age;
  // }

}
