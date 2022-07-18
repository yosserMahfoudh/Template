import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from '@modules/entreprises/services/entreprises.service';
import { Entreprise } from '@modules/entreprises/models';
@Component({
  selector: 'sb-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

    entreprise:any;
    comments: Comment[] = [];
    isLoading = true;
  constructor( private route: ActivatedRoute, private entrepriseService: EntrepriseService ) { }

  ngOnInit(): void {
    this.getEntrepriseDetails(this.route.snapshot.params.id);
    console.log(this.route.snapshot.params.id);
    console.log(this.entreprise)

  }
  getEntrepriseDetails(id: any) {
    this.entrepriseService.read(id)
      .subscribe((data: any) => {
        this.entreprise = data.data.entreprise;
        console.log(this.entreprise);
      //  this.getCommentsByPostId();
        this.isLoading = false;
      });
  }

 /* getCommentsByPostId() {
    this.apiComment.getCommentsByPostId(this.post.id)
      .subscribe((res: any) => {
        this.comments = res;
      }, err => {
        console.log(err);
      });
  }*/
}
