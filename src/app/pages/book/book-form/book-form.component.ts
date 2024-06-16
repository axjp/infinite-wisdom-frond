import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  protected form: FormGroup;
  categories: any = [];
  private fileTmp: any;
  private imageTmp: any;
  idbook: any= [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      nameauthor: [null, [Validators.required]],
      lastnameauthor: [null, [Validators.required]],
      year: [null, [Validators.required]],
      idcategory: [null, [Validators.required]],
      editorial: [null, [Validators.required]],
      description: [null, [Validators.required]],
      pdfFile: [null, [Validators.required]],
      imageFile: [null, [Validators.required]],
    });

    this.route.params.subscribe(params => {
      this.idbook = +params['idbook'];
      this.getbook(this.idbook);
    });
    this.getcategories();
  }


  getcategories() {
    const url = 'http://localhost:3000/categories';
    this.httpClient.get<any>(url).subscribe(response => {
      this.categories = response;
    });
  }

  save() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;
      const categoriesString = this.form.controls['idcategory'].value.join(',');

      const body = new FormData();

      if (this.imageTmp) {
        body.append('myImage', this.imageTmp.fileRaw, this.imageTmp.fileName);
      }

      if (this.fileTmp) {
        body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName);
      }

      body.append('title',this.form.controls['title'].value)
      body.append('nameauthor',this.form.controls['nameauthor'].value)
      body.append('lastnameauthor',this.form.controls['lastnameauthor'].value)
      body.append('year',this.form.controls['year'].value)
      body.append('idcategory',this.form.controls['idcategory'].value)
      body.append('description',this.form.controls['description'].value)
      body.append('editorial',this.form.controls['editorial'].value)
      body.append('imageFile',this.form.controls['imageFile'].value)

      const url = 'http://localhost:3000/upload';
      this.httpClient.post(url, body).subscribe(response => {
        alert(response);

      });
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }
  }

  update() {
    const url = 'http://localhost:3000/upload/' + this.idbook;
    this.httpClient.put(url, this.form.value).subscribe(response => {
      alert(response);
    });
  }

  getFile($event: any, fileType: string) {
    const [file] = $event.target.files;
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

  getbook(idbook:number){

    const url = 'http://localhost:3000/upload/' + idbook;
    this.httpClient.get<any>(url).subscribe(response => {
      if (response) {
        this.form.patchValue(response);
      }
    });
  }
}
