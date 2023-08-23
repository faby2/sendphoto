import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoublephotosPage } from './doublephotos.page';

describe('DoublephotosPage', () => {
  let component: DoublephotosPage;
  let fixture: ComponentFixture<DoublephotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DoublephotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
