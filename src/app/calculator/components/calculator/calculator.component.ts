import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)':'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick (key: string) {
    console.log({key})
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Enter: '=',
      Escape: 'C',
      '*': 'x',
      '/': '÷',
    };

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach( button =>{
      button.keyboardPressedStyle(keyValue);
    });
  };

}
