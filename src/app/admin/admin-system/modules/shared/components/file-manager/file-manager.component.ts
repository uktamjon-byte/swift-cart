import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataGrid from 'devextreme/ui/data_grid';
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import Dropzone from 'dropzone';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  collapsed: any;
  gridInstance!: DataGrid;
  dataDialogTitle = null;
  isDialog!: boolean;

  /** Override defaults when needed */
  @Input() url?: string;
  @Input() accept?: string;
  @Input() maxSizeMb?: number;
  @Input() headers?: Record<string, string>;
  @Input() autoProcess = false;

  /** Emits when backend returns success payload */
  @Output() uploaded = new EventEmitter<any>();
  /** Emits when Dropzone reports an error */
  @Output() failed = new EventEmitter<any>();
  // @ViewChild(DropzoneDirective, { static: false })
  // directiveRef?: DropzoneDirective;
  @ViewChild('dzRef', { static: false }) directiveRef?: DropzoneDirective;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any | null,
    @Optional() private dialogRef: MatDialogRef<FileManagerComponent>
  ) {}

  dataSource = [
    {
      id: 1,
      check: false,
      title: 'Stories of Satisfaction and Success',
      image: 'assets/imagis/product1.jpg',
      date: Date(),
    },
    {
      id: 2,
      check: true,
      title: 'Stories of Satisfaction and Success',
      image: 'assets/imagis/product2.jpg',
      date: Date(),
    },
    {
      id: 3,
      check: true,
      title: 'Stories of Satisfaction and Success',
      image: 'assets/imagis/product2.jpg',
      date: Date(),
    },
    {
      id: 4,
      check: true,
      title: 'Stories of Satisfaction and Success',
      image: 'assets/imagis/product2.jpg',
      date: Date(),
    },
    {
      id: 5,
      check: true,
      title: 'Stories of Satisfaction and Success',
      image: 'assets/imagis/product2.jpg',
      date: Date(),
    },
    // more rows...
  ];

  ngOnInit(): void {
    this.dataDialogTitle = this.data?.title;
    this.isDialog = this.data?.isDialog;
    console.log(this.dataDialogTitle, this.isDialog);
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  public onInitGrid(e: any) {
    console.log('init grid', e);
    this.gridInstance = e.component;
  }

  selectImage(image: any) {
    // Close the dialog and return the image
    this.dialogRef.close(image);
    console.log('insert', image);
  }

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }

  get config(): DropzoneConfigInterface {
    return {
      url: this.url ?? '/api/upload',
      acceptedFiles: this.accept ?? 'image/*',
      maxFilesize: this.maxSizeMb ?? 10,
      headers: this.headers,
      autoProcessQueue: this.autoProcess,
      addRemoveLinks: true,
      parallelUploads: 3,
      uploadMultiple: false,
    };
  }

  onSuccess(evt: any) {
    // evt usually looks like [file, response]
    this.uploaded.emit(evt);
    console.log('event', evt);
  }

  onError(evt: any) {
    // evt usually looks like [file, errorMessage, xhr]
    this.failed.emit(evt);
  }

  // Optional: add headers/formdata just before send
  onSending(evt: any) {
    // [file, xhr, formData]
    const [, , formData] = evt;
    formData.append('folderId', '123'); // example extra meta
  }
  // uploadAllFiles() {
  //   console.log('upload1');
  //   if (this.directiveRef) {
  //     console.log('upload2');
  //     const dz = this.directiveRef.dropzone(); // should give you Dropzone instance
  //     console.log('dropzone instance:', dz);
  //     dz.processQueue();
  //     console.log('upload3');
  //   } else {
  //     console.warn('directiveRef is undefined');
  //   }
  // }

  uploadAllFiles() {
    console.log('upload1');

    if (this.directiveRef) {
      console.log('upload2');

      // Cast safely to Dropzone
      const dz = this.directiveRef.dropzone as unknown as InstanceType<
        typeof Dropzone
      >;

      console.log('dropzone instance:', dz);
      console.log('upload3');
    } else {
      console.warn('directiveRef is undefined');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
