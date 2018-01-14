import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule
    ]
})

export class MaterialModule {  }
