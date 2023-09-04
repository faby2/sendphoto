import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicPhotoPage } from './pic-photo.page';

describe('PicPhotoPage', () => {
  let component: PicPhotoPage;
  let fixture: ComponentFixture<PicPhotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PicPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
