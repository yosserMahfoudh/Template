import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( private router: Router,private categoryService: CategoriesService,private auth: AuthService,private route: ActivatedRoute, private entrepriseService: EntrepriseService) { }
  @Input()listCategory : string[]=[];

  @Input()selectedValue: string="";
  //productForm !: FormGroup;
  entreprise: any;
  currentEntreprise = null;
  currentIndex = -1;
  name = '';
  loading!:boolean
  userId!: string;
  idCat : any;

productForm = new FormGroup({
    title:new FormControl(),
    short_description:new FormControl(),
    description:new FormControl(),
    category:new FormControl(),
    image:new FormControl()
   });

  ngOnInit(): void {
   this.getEntrepriseById(this.route.snapshot.params.id);
    //this.selectedValue= this.entreprise.category_details.id;
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

   this.entreprise=Object.assign({},this.entrepriseService.read(id)
      .subscribe((res) => {
        console.log(res.data.entreprise)
        this.productForm = new FormGroup({
            title:new FormControl(res.data.entreprise.title),
            short_description:new FormControl(res.data.entreprise.short_description),
            description:new FormControl(res.data.entreprise.description),
            category:new FormControl(res.data.entreprise.category_details._id),
           // image:new FormControl()

        })
       // this.entreprise=res.data.entreprise;
        console.log(this.productForm)
      }, error => {
        console.log(error);
      }));
  }



  updateProduct(entreprise: Entreprise)
  {
       this.idCat=this.route.snapshot.params.id;

          this.entrepriseService.update(entreprise,this.idCat).subscribe(
              ( entreprises:any) => {
                console.log(entreprises);
                  if (entreprises=== 201) {

                      console.log(entreprises);  }


              },
              (        error) => {
                console.log(error);
              });

  this.router.navigate(['/entreprise']);

  }



}
