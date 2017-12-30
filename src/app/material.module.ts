import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatStepperModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule
    ]
})

export class MaterialModule {  }
