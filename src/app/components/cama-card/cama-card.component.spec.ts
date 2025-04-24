import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaCardComponent } from './cama-card.component';

describe('CamaCardComponent', () => {
  let component: CamaCardComponent;
  let fixture: ComponentFixture<CamaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CamaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
