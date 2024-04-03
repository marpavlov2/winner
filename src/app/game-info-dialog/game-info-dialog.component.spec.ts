import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoDialogComponent } from './game-info-dialog.component';

describe('QrCodeDialogComponent', () => {
  let component: GameInfoDialogComponent;
  let fixture: ComponentFixture<GameInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameInfoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
