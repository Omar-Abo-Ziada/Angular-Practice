import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCreditCard',
  standalone: true
})
export class FormatCreditCardPipe implements PipeTransform
 {

  transform(value: number): string 
  {
    let stringValue = value.toString();

    let formattedNum = "";
  
    for (let index = 0; index < stringValue.length; index++) 
    {
      if (index % 4 == 0 && index != 0) 
      {
        formattedNum += "-";
      }
      formattedNum += stringValue[index];
    }
  
    return formattedNum;
  }
  

}
