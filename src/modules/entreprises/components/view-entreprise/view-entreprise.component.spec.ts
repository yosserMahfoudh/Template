import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntrepriseComponent } from './view-entreprise.component';

describe('ViewEntrepriseComponent', () => {
  let component: ViewEntrepriseComponent;
  let fixture: ComponentFixture<ViewEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
