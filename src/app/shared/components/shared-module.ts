import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { BottomNavigationComponent } from '../../store/system/core/components/bottom-navigation/bottom-navigation.component';
import { SearchInputResComponent } from '../../store/system/core/components/search-input-res/search-input-res.component';
import { SearchInputComponent } from '../../store/system/core/components/search-input/search-input.component';
import { ResCategorySidebarComponent } from '../../store/system/core/components/res-category-sidebar/res-category-sidebar.component';
import { ResSwitchlangCanvasComponent } from '../../store/system/core/components/res-switchlang-canvas/res-switchlang-canvas.component';

@NgModule({
  declarations: [
    LangDropdownComponent,
  ], // Declare the component here
  imports: [CommonModule],           // Import CommonModule for Angular directives (ngIf, ngFor, etc.)
  exports: [
    LangDropdownComponent,

  ]       // Export the component to make it reusable
})
export class SharedModule { }
