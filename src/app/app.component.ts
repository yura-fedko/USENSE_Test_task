import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, tap, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  password = new FormControl('');
  color1: string = 'grey'
  color2: string = 'grey'
  color3: string = 'grey'
  input$: any

  constructor() {}

  ngOnInit(): void {
    this.input$ = this.password.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe( inputValue => {
      this.validator(inputValue)
    }
    )
  }

  ngOnDestroy() {
    this.input$.unsubscribe()
  }


  validator(inputValue: any) {
    if(inputValue.length === 0) {
      this.color1 = 'grey'
      this.color2 = 'grey'
      this.color3 = 'grey'
      return
    }

    if(inputValue.length < 8) {
      this.color1 = 'red'
      this.color2 = 'red'
      this.color3 = 'red'
    }

    if(inputValue.length >= 8) {
      if(inputValue.match( /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}]+$/)) {
        this.color1 = 'green'
        this.color2 = 'green'
        this.color3 = 'green'  
      }

      if(inputValue.match( /^[a-zA-Z!"#$%&'()*+,-./:;<=>?@[\]^_`{|}]+$/) || inputValue.match( /^[a-zA-Z0-9]+$/) || inputValue.match(/^[0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}]+$/)) {
        this.color1 = 'yellow'
        this.color2 = 'yellow'
        this.color3 = 'grey'  
      }

      if(inputValue.match(/^[A-Za-z]+$/) || inputValue.match(/^\d+$/)  || inputValue.match(/^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}]+$/)){
        this.color1 = 'red'
        this.color2 = 'grey'
        this.color3 = 'grey'
      }
    }
  }
}
