import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';

@Component({
  selector: 'app-save-edit-toolbar',
  templateUrl: './save-edit-toolbar.component.html',
  styleUrls: ['./save-edit-toolbar.component.scss'],
})
export class SaveEditToolbarComponent implements OnInit {
  @Input() editMode = false;
  @Input() entityName = '';
  @Input() loading = false;
  @Input() invalid = false;
  @Input() codeExist = false;
  @Input() isImageLoaded = false;

  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private adminService: AdminService) {}

  onSave() {
    if (!this.loading) {
      this.loading = true;
      this.save.emit();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  stopLoading() {
    this.loading = false;
    console.log('stop loader');
  }

  ngOnInit(): void {
    this.adminService.stopLoader.subscribe((res) => {
      if (res) this.stopLoading();
    });
  }
}
