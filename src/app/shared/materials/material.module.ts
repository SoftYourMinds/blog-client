import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

const Materials = [
    MatDialogModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
];

@NgModule({
    declarations: [],
    imports: [Materials],
    exports: [Materials]
})
export class MaterialModule {}