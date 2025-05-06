import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroColaboradoresComponent } from './cadastro-colaboradores.component';

describe('CadastroColaboradoresComponent', () => {
  let component: CadastroColaboradoresComponent;
  let fixture: ComponentFixture<CadastroColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroColaboradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
