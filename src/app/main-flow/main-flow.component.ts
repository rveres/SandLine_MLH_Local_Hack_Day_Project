import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-flow',
  templateUrl: './main-flow.component.html',
  styleUrls: ['./main-flow.component.scss']
})
export class MainFlowComponent implements OnInit {
  sandOptions: FormGroup;

  toppingsOptions: string[];

  selectedType: string;
  toppingsSelected: boolean[];

  onSandOptionsChanges(): void {
    this.sandOptions.valueChanges.subscribe(val => {
      this.selectedType = val.selectedSandType;
      if (val.selectedSandType === 'ham') {
        this.toppingsSelected = [true, false, false, false, false, false, false];
      } else if (val.selectedSandType === 'turkey') {
        this.toppingsSelected = [false, true, false, false, false, false, false];
      } else if (val.selectedSandType === 'chicken') {
        this.toppingsSelected = [false, false, true, false, false, false, false];
      } else if (val.selectedSandType === 'veggie') {
        this.toppingsSelected = [false, false, false, false, true, true, false];
      } else if (val.selectedSandType === 'custom') {
        this.toppingsSelected = [false, false, false, false, false, false, false];
      }
    });
  }

  constructor(private _formBuilder: FormBuilder) {
    this.toppingsOptions = ['Ham', 'Turkey', 'Chicken', 'Cheese', 'Lettuce', 'Tomatoes', 'Mustard'];

    this.toppingsSelected = [true, false, false, false, false, false, false];

    this.sandOptions = _formBuilder.group({
      hideRequired: false,
      selectedSandType: new FormControl('', [
        Validators.required,
      ]),
    });
   }

  ngOnInit() {
    this.onSandOptionsChanges();
  }

}
