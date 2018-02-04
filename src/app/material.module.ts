import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatCardModule,
MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

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
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule
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
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule
    ]
})

export class MaterialModule {  }
