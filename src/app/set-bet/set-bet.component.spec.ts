import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBetComponent } from './set-bet.component';

describe('SetBetComponent', () => {
  let component: SetBetComponent;
  let fixture: ComponentFixture<SetBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetBetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
