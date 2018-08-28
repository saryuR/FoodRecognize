import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class LifeRestProvider {

  lifeUrl = "http://api.population.io:80/1.0/life-expectancy/remaining/";
  country = "United%20States";
  today = new Date();
  curr_date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();



  constructor(public http: HttpClient) {
  }


  lifeLeft(sex,age) {
    return new Promise(resolve => {
      this.http.get(this.lifeUrl+sex+"/"+this.country+"/"+this.curr_date+"/"+age+"y/").subscribe(data => {
        resolve(data);
      }, error =>{
        console.log("Uh-oh. Check your URL",error);
      });
    });
  }

  // postRequest(ask, sex, weight, height, age) {
  //
  //   let postParams = {
  //     query: ask,
  //     gender: sex,
  //     weight_kg: weight*100,
  //     height_cm: height ,
  //     age: age
  //   }
  //   this.http.post("https://trackapi.nutritionix.com/v2/natural/exercise", postParams,{headers:{'x-app-id':'40f3a84e','x-app-key':'6ccd827ee37d11bf3878abc0ef5d0173', 'Content-Type': 'application/json'}});
  //
  // }
}
