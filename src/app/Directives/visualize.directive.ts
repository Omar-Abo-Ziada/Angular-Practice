import { Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appVisualize]',
  standalone: true
})
export class VisualizeDirective implements OnChanges {

  // private element ;

 @Input() bgColor : string = "#e0f5ff";    // => light blue

  constructor(private element : ElementRef) 
  {
        // this.element = element ;

        // this.element.nativeElement.style.backgroundColor = 'pink';

    this.element.nativeElement.style.borderRadius = '8px';
    
    this.element.nativeElement.style.borderStyle = 'solid';
    this.element.nativeElement.style.borderWidth = '2px';
    this.element.nativeElement.style.borderColor = 'black';
    
    this.element.nativeElement.style.boxShadow = '5px 2px 20px rgba(0, 0, 0, 0.3)';
    
    // this.element.nativeElement.style.backgroundColor = 'white';
    
    this.element.nativeElement.style.cursor = 'pointer';
  }
  


  @HostListener('mouseover') onMouseOver() 
  {
    // this.element.nativeElement.style.backgroundColor = '#f0f0f0'; 
    this.element.nativeElement.style.backgroundColor = this.bgColor; 
    this.element.nativeElement.style.boxShadow = '20px 2px 20px rgba(0, 0, 255, 0.3)'; 
  }

  @HostListener('mouseleave') onMouseLeave() 
  {
    this.element.nativeElement.style.backgroundColor = 'white'; 
    this.element.nativeElement.style.boxShadow = '5px 2px 20px rgba(0, 0, 0, 0.3)'; 
  }
















  
    ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

}
