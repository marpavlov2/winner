import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersInRoundComponent } from './players-in-round.component';

describe('PlayersInRoundComponent', () => {
  let component: PlayersInRoundComponent;
  let fixture: ComponentFixture<PlayersInRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersInRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersInRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
