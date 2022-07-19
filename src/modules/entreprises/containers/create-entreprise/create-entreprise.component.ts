import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { CategoriesService } from '@modules/categories/services';
import { Entreprise } from '@modules/entreprises/models';
import { EntrepriseService } from '@modules/entreprises/services/entreprises.service';

@Component({
  selector: 'sb-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.scss']
})
export class CreateEntrepriseComponent implements OnInit {
    constructor( private categoryService: CategoriesService,private entrepriseService: EntrepriseService,  private router: Router, private formBuilder: FormBuilder, private auth: AuthService) { }
    @Input()listCategory : string[]=[];

    @Input()selectedValue: string="";
    productForm !: FormGroup;
    entreprises: any;
    currentEntreprise = null;
    currentIndex = -1;
    name = '';
    loading!:boolean
    userId!: string;

    ngOnInit(): void {
        this.productForm = new FormGroup({
        title:new FormControl(),
		short_description:new FormControl(),
		description:new FormControl(),
		category:new FormControl(),
		image:new FormControl()
       });
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


onSubmit(){
    const product = new Entreprise();
    product.title=this.productForm.get('title')?.value;
    product.short_description=this.productForm.get('short_description')?.value;
    product.description=this.productForm.get('description')?.value;
    product.category=this.productForm.get('category')?.value;
    //product.image= this.productForm.get('image')?.value;
    console.log(this.auth.userId);
    product.created_by =this.auth.userId;
    console.log(localStorage);
    //save entreprise
    this.submitHandler(product);
    this.router.navigate(['/entreprise']);


}
    submitHandler(entreprise: Entreprise) {

      console.log(entreprise);
      this.entrepriseService.create(entreprise).subscribe(
        (entreprises:any) => {

            if (entreprises=== 201) {
                this.readProducts()
                 console.log(entreprises);  }


        },
        (        error) => {
          console.log(error);
        });;
      this.router.navigateByUrl('/entreprise');
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


    deleteProduct(id: string)
    {
        return new Promise((resolve, reject) =>{

            this.entrepriseService.delete(id).subscribe(
                () => {

                        this.readProducts();
                        resolve(true);


                },
                (        error) => {
                  reject(error);
                });
    });
    }


imagePreview : string | null | undefined;



    OnImagePick(event: Event)
    {
         const file = (event.target as HTMLInputElement)!.files;
        this.productForm.get('image')!.patchValue(file);
        this.productForm.get('image')?.updateValueAndValidity();
   const reader = new FileReader();
   reader.onload= ()=>{
    if (this.productForm.get('image')?.valid){
        this.imagePreview =reader.result as string;

    }else{
        this.imagePreview=null;
    }

   }
    }


}
