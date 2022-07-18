/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { EntreprisesModule } from './entreprises.module';

/* Containers */
import * as entreprisesContainers from './containers';
/* Guards */
/* Guards */
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
     {
        path: '',
        canActivate: [],
        component: entreprisesContainers.EntreprisesComponent,
        data: {
            title: 'Entreprise - SB Admin Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Entreprises',
                    active: true,
                }
            ],
        } as SBRouteData,
    },

    {
        path: 'create',
        canActivate: [],
        component: entreprisesContainers.CreateEntrepriseComponent,
        data: {
            title: 'Pages create - Restofinder',
        } as SBRouteData,
    },
    {
        path: 'view/:id',
        canActivate: [],
        component: entreprisesContainers.ViewProductComponent,
        data: {
            title: 'Pages create - Restofinder',

        } as SBRouteData,
    },
    {
        path: 'delete/:id',
        canActivate: [],
        component: entreprisesContainers.EntreprisesComponent,
        data: {
            title: 'Pages create - Restofinder',

        } as SBRouteData,
    },
    {
        path: 'edit/:id',
        canActivate: [],
        component: entreprisesContainers.EditEntrepriseComponent,
        data: {
            title: 'Pages create - Restofinder',

        } as SBRouteData,
    }


];

@NgModule({
    imports: [EntreprisesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class EntreprisesRoutingModule {}
