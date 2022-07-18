import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EntrepriseService } from '@modules/entreprises/services/entreprises.service';

@Component({
  selector: 'sb-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.scss']
})
export class EntreprisesComponent implements OnInit {

    entreprises: any;
    currentEntreprise = null;
    currentIndex = -1;
    name = '';

  constructor(private entrepriseService: EntrepriseService, private router:ActivatedRoute) { }


  ngOnInit(): void {
    this.readProducts();
    console.log(this.router.snapshot.params.id);
  }

  readProducts(): void {
    this.entrepriseService.readAll()
      .subscribe(
        (        entreprises) => {

          this.entreprises = entreprises;
          console.log(entreprises);
        },
        (        error) => {
          console.log(error);
        });
  }

  readProductById( id: String): void {
    this.entrepriseService.read(id)
      .subscribe(
        (        entreprises) => {

          this.entreprises = entreprises;
          console.log(entreprises);
        },
        (        error) => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readProducts();
    this.currentEntreprise = null;
    this.currentIndex = -1;
  }

  setCurrentProduct(product: null, index: number): void {
    this.currentEntreprise = product;
    this.currentIndex = index;
  }

  deleteAllProducts(): void {
    this.entrepriseService.deleteAll()
      .subscribe(
        (        response) => {
          console.log(response);
          this.readProducts();
        },
        (        error) => {
          console.log(error);
        });
  }
 /* deleteEntreprise(id: any) {
    id =this.router.snapshot.params.id;
    this.entrepriseService.delete(id)
      .subscribe(() => {
        console.log("delete")
        this.refresh();
       // this.router.navigate(["/entreprise/"]);
      });
  }*/

  searchByName(): void {
    this.entrepriseService.searchByName(this.name)
      .subscribe(
        (        entreprises) => {
          this.entreprises = entreprises;
          console.log(entreprises);
        },
        (        error) => {
          console.log(error);
        });
  }


}
