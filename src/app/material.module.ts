import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ]
})

export class MaterialModule {  }
