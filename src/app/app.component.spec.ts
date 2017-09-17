import { AppComponent } from './app.component';
import { EnvironmentService } from './util/environment.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let h1: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ AppComponent ],
      providers: [
        EnvironmentService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    h1 = de.nativeElement;
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h1> text', () => {
    fixture.detectChanges();

    expect(h1.innerText).toMatch(/Sprachvermittlung beantragen/i,
      '<h1> should say something about "Sprachvermittlung beantragen"');
  });
});
