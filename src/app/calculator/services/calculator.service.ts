import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('10');
  public subResultText = signal('10');
  public lastOperator = signal('+');

}
