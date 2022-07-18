import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from '@modules/entreprises/services/entreprises.service';
import { Entreprise } from '@modules/entreprises/models';
@Component({
  selector: 'sb-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {

    id: any;
    entreprises!: Entreprise[];
    entreprise: Entreprise = new Entreprise();
    currentEntreprise = null;
    currentIndex = -1;
    name = '';
  constructor(private entrepriseService: EntrepriseService,  private router:ActivatedRoute) {

  }


  ngOnInit(): void {
    this.readProducts();
   // this.id =this.router.snapshot.params.id;
    //console.log(this.id);
  }

  readProducts(): void {
    this.entrepriseService.readAll()

      .subscribe(
        (        data) => {

          this.entreprises = data['data']['entreprises'];
          console.log(data['data']['entreprises']);
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

  deleteEntreprise(id: any) {

    this.entrepriseService.delete(id)
      .subscribe(() => {
        console.log("delete")
        this.refresh();
       // this.router.navigate(["/entreprise/"]);
      });
}
}
