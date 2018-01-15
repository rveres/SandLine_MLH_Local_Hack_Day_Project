import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatRadioModule,
        MatCheckboxModule
    ]
})

export class MaterialModule {  }
