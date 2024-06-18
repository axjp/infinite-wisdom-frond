import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  protected form: FormGroup;
  protected book: BookI = {};
  protected idbook: any = null;
  protected fileTmp: any;
  protected imageTmp: any;
  selectedPdf: File | null = null;
  selectedImage: File | null = null;
  message: string = '';

  constructor() {
    this.form = this.buildForm;

    this.route.params.subscribe(params => {
      this.idbook = params['idbook'];
      if (this.idbook) {
        this.findOneBook(this.idbook);
       
      }
    });
  }

  get buildForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      nameauthor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastnameauthor: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      publicationDate: ['', [Validators.required]],
      edition: [null, [Validators.required, Validators.min(0)]],
      editorial: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
      pdfName: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      categories: [[], Validators.required],
      state: [false, Validators.requiredTrue],
    });
  }

  get titleField(): AbstractControl {
    return this.form.controls['title'];
  };
  get nameauthorField(): AbstractControl {
    return this.form.controls['nameauthor'];
  };
  get lastnameauthorField(): AbstractControl {
    return this.form.controls['lastnameauthor'];
  };
  get publicationDateField(): AbstractControl {
    return this.form.controls['publicationDate'];
  };
  get editionField(): AbstractControl {
    return this.form.controls['edition'];
  };
  get editorialField(): AbstractControl {
    return this.form.controls['editorial'];
  };
  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
  };
  get pdfNameField(): AbstractControl {
    return this.form.controls['pdfName'];
  };
  get imageUrlField(): AbstractControl {
    return this.form.controls['imageUrl'];
  };
  get categoriesField(): AbstractControl {
    return this.form.controls['categories'];
  };
  get stateField(): AbstractControl {
    return this.form.controls['state'];
  };

  validateform() {
    if (this.form.status === 'VALID') {
      this.bookService.createBook(this.form.value).subscribe(
        response => {
          alert('Registro realizado con éxito');
        });
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }
  }


  
  getFile(event: any, fileType: string) {
    const [file] = event.target.files;
    if (fileType === 'image') {
      this.imageTmp = {
        fileRaw: file,
        fileName: file.name
      };
    } else if (fileType === 'pdf') {
      this.fileTmp = {
        fileRaw: file,
        fileName: file.name
      };
    }
  }
  submitForm() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('nameauthor', this.form.get('nameauthor')?.value);
      formData.append('lastnameauthor', this.form.get('lastnameauthor')?.value);
      formData.append('publicationDate', this.form.get('publicationDate')?.value);
      formData.append('edition', this.form.get('edition')?.value);
      formData.append('editorial', this.form.get('editorial')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('categories', this.form.get('categories')?.value);
      formData.append('state', this.form.get('state')?.value);

      if (this.imageTmp) {
        formData.append('image', this.imageTmp.fileRaw);
      }
      if (this.fileTmp) {
        formData.append('pdf', this.fileTmp.fileRaw);
      }

      this.bookService.createBook(formData).subscribe(
        response => {
          alert('Registro realizado con éxito');
          console.log(response);
        },
        error => {
          alert('Ocurrió un error al registrar el libro');
        }
      );
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }
  }
 
  findOneBook(idbook: string) {
    this.bookService.findOneBook(idbook).subscribe(response => {
      this.book = response;
      this.form.patchValue(this.book);
    });
  }

}

/* uploadFiles() {
    const formData = new FormData();
    if (this.imageTmp) {
      formData.append('image', this.imageTmp.fileRaw);
    }
    if (this.fileTmp) {
      formData.append('pdf', this.fileTmp.fileRaw);
    }
    this.bookService.createBook(formData).subscribe(response => {
      console.log(response);
    });
  }
  
  createBook() {
    this.bookService.createBook(this.form.value).subscribe(response => {
      console.log(response);
    })
  }*/
  /* createBook() {
     this.bookService.createBook({}).subscribe(response => {
       console.log(response);
     })
   }
 
 
   validateform() {
     if (this.form.valid) {
       alert('Valido');
     } else {
       alert('no Valido');
     }
   }
 */