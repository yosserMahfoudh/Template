import { TestBed } from '@angular/core/testing';

import { EntreprisesGuard } from './entreprises.guard';

describe('Entreprises Guards', () => {
    let entreprisesGuard: EntreprisesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [EntreprisesGuard],
        });
        entreprisesGuard = TestBed.inject(EntreprisesGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            entreprisesGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
