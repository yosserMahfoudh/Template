import { TestBed } from '@angular/core/testing';

import { EntreprisesService } from './entreprises.service';

describe('EntreprisesService', () => {
    let entreprisesService: EntreprisesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EntreprisesService],
        });
        entreprisesService = TestBed.inject(EntreprisesService);
    });

    describe('getEntreprises$', () => {
        it('should return Observable<Entreprises>', () => {
            expect(entreprisesService).toBeDefined();
        });
    });
});
