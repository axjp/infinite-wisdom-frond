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
      pdfname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
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
  get pdfnameField(): AbstractControl {
    return this.form.controls['pdfname'];
  };
  get imageField(): AbstractControl {
    return this.form.controls['image'];
  };
  get categoriesField(): AbstractControl {
    return this.form.controls['categories'];
  };
  get stateField(): AbstractControl {
    return this.form.controls['state'];
  };


  validateform() {
    if (this.form.valid) {
      alert('Valido');
    } else {
      alert('no Valido');
    }
  }

  findOneBook(idbook: string) {
    this.bookService.findOneBook(idbook).subscribe(response => {
      this.book = response;
      this.form.patchValue(this.book);
    });
  }
  
}
