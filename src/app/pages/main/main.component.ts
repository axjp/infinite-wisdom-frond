import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  books8: any = null;
  books1: any = null;
  books2: any = null;
  books4: any = null;
  books5: any = null;
  books6: any = null;
  books7: any = null;
  books3: any = null;
  books9: any = null;
  books10: any = null;
  books11: any = null;
  books12: any = null;

  constructor(private httpClient: HttpClient, private router: Router) {

    this.getbooks8();
    this.getbooks3();
    this.getbooks1();
    this.getbooks2();
    this.getbooks4();
    this.getbooks5();
    this.getbooks6();
    this.getbooks7();
    this.getbooks9();
    this.getbooks10();
    this.getbooks11();
    this.getbooks12();

  }

  getbooks8() {
    const url = 'http://localhost:3000/bookcard8';
    this.httpClient.get(url).subscribe(response => {
      this.books8 = response;
    });
  }

  getbooks3() {
    const url = 'http://localhost:3000/bookcard3';
    this.httpClient.get(url).subscribe(response => {
      this.books3 = response;
    });
  }
  getbooks1() {
    const url = 'http://localhost:3000/bookcard1';
    this.httpClient.get(url).subscribe(response => {
      this.books1 = response;
    });
  }
  getbooks2() {
    const url = 'http://localhost:3000/bookcard2';
    this.httpClient.get(url).subscribe(response => {
      this.books2 = response;
    });
  }

  getbooks4() {
    const url = 'http://localhost:3000/bookcard4';
    this.httpClient.get(url).subscribe(response => {
      this.books4 = response;
    });
  }
  getbooks5() {
    const url = 'http://localhost:3000/bookcard5';
    this.httpClient.get(url).subscribe(response => {
      this.books5 = response;
    });
  }
  getbooks6() {
    const url = 'http://localhost:3000/bookcard6';
    this.httpClient.get(url).subscribe(response => {
      this.books6 = response;
    });
  }
  getbooks7() {
    const url = 'http://localhost:3000/bookcard7';
    this.httpClient.get(url).subscribe(response => {
      this.books7 = response;
    });
  }
  getbooks9() {
    const url = 'http://localhost:3000/bookcard9';
    this.httpClient.get(url).subscribe(response => {
      this.books9 = response;
    });
  }
  getbooks10() {
    const url = 'http://localhost:3000/bookcard10';
    this.httpClient.get(url).subscribe(response => {
      this.books10 = response;
    });
  }
  getbooks11() {
    const url = 'http://localhost:3000/bookcard11';
    this.httpClient.get(url).subscribe(response => {
      this.books11 = response;
    });
  }
  getbooks12() {
    const url = 'http://localhost:3000/bookcard12';
    this.httpClient.get(url).subscribe(response => {
      this.books12 = response;
    });
  }
}
