import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  API : string = 'http://localhost:9000/api'

  constructor(private http: HttpClient, private zone: NgZone) { }

  getResultadosTateti(): Observable<any>{
    return this.http.get(this.API+'/tateti')
  }

  getResultadosMemotest(): Observable<any>{
    return this.http.get(this.API+'/memotest')
  }

  getResultadosBlueball(): Observable<any>{
    return this.http.get(this.API+'/blueball')
  }

  addResultadoBlueball(name : string, time : number){
    
    let subA = this.zone.run(() => this.http.post(this.API+'/blueball', {name, time}, {responseType: 'text'}).subscribe(sub => {
			console.log(sub);
		}));

    setTimeout(() => {
			subA.unsubscribe();
		}, 3000)
  }

  addResultadoTateti(name : string, score : number){
    
    let subA = this.zone.run(() => this.http.post(this.API+'/tateti', {name, score}, {responseType: 'text'}).subscribe(sub => {
			console.log(sub);
		}));

    setTimeout(() => {
			subA.unsubscribe();
		}, 3000)
  }

  addResultadoMemotest(name : string, time : number){
    
    let subA = this.zone.run(() => this.http.post(this.API+'/memotest', {name, time}, {responseType: 'text'}).subscribe(sub => {
			console.log(sub);
		}));

    setTimeout(() => {
			subA.unsubscribe();
		}, 3000)
  }
}
