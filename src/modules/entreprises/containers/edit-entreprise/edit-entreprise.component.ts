import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CategoriesService } from '@modules/categories/services/categories.service';
import { Entreprise } from '@modules/entreprises/models';
import { EntrepriseService } from '@modules/entreprises/services/entreprises.service';

@Component({
  selector: 'sb-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.scss']
})
export class EditEntrepriseComponent implements OnInit {

  constructor( private categoryService: CategoriesService,private auth: AuthService,private route: ActivatedRoute, private entrepriseService: EntrepriseService) { }
  @Input()listCategory : string[]=[];

  @Input()selectedValue: string="";
  productForm !: FormGroup;
  entreprise: any;
  currentEntreprise = null;
  currentIndex = -1;
  name = '';
  loading!:boolean
  userId!: string;


  ngOnInit(): void {
    this.entreprise = this.getEntrepriseById(this.route.snapshot.params.id);

       //this.getById(this.route.snapshot.params.id);

      // this.userId=this.auth.userId;
       this.getCategory();

  }
  private getCategory() {
    this.categoryService.readAll()
    .subscribe(
      (category) => {
        for(var i = 0; i < category.categories.length; i++){  // loop through the object array
            this.listCategory.push(category.categories[i]);
       }
      },
      (        error) => {
        console.log(error);
      });


  }

  getEntrepriseById(id: any) {
    this.entrepriseService.read(id)
      .subscribe((res) => {
        console.log(res.data.entreprise.title)
        this.entreprise=res.data.entreprise;
        console.log(this.entreprise)
      }, error => {
        console.log(error);
      });
  }

  updateProduct(entreprise: Entreprise, id: string)
  {
       return new Promise((resolve, reject) =>{
          let product: FormData =new FormData();
          product.append('product',JSON.stringify(entreprise));
          this.entrepriseService.update(id,product).subscribe(
              (        entreprises:any) => {
                  if (entreprises=== 201) {

                      resolve(entreprises);  }


              },
              (        error) => {
                reject(error);
              });
  });
  }



}
