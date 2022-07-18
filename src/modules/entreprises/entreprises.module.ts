/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as entreprisesComponents from './components';

/* Containers */
import * as entreprisesContainers from './containers';

/* Guards */
import * as entreprisesGuards from './guards';

/* Services */
import * as entreprisesServices from './services';
//import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { EntreprisesComponent } from './containers/entreprises/entreprises.component';
import { CreateEntrepriseComponent } from './containers/create-entreprise/create-entreprise.component';
import { ViewEntrepriseComponent } from './components/view-entreprise/view-entreprise.component';
import { ViewProductComponent } from './containers/view-product/view-product.component';
import { CommentsComponent } from './containers/comments/comments.component';
import { EditEntrepriseComponent } from './containers/edit-entreprise/edit-entreprise.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...entreprisesServices.services, ...entreprisesGuards.guards],
    declarations: [...entreprisesContainers.containers, ...entreprisesComponents.components, EntreprisesComponent, EditEntrepriseComponent, CreateEntrepriseComponent, ViewEntrepriseComponent, ViewProductComponent, CommentsComponent],
    exports: [...entreprisesContainers.containers, ...entreprisesComponents.components],
})
export class EntreprisesModule {}
