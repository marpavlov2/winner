import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotOfGoldComponent } from './pot-of-gold.component';

describe('PotOfGoldComponent', () => {
  let component: PotOfGoldComponent;
  let fixture: ComponentFixture<PotOfGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotOfGoldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PotOfGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
