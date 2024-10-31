import { Injectable, signal } from '@angular/core';

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/','x','÷'];
const specialOperators = ['=','.','C','Backspace','%','+/-'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumbers(value: string): void {
    if(![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    };

    //Calcular resultados
    if(value === '=') {
      if(this.subResultText() === '0') return;
      this.calculteResult();
      console.log('calcular resultado');
      return;
    };

    //Limpiar resultados
    if(value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    };

    // Backspace
    if(value === 'Backspace') {
      if( this.resultText() === '0' ) return;
      if( this.resultText().length === 1  || this.resultText() === '-0') {
        this.resultText.set('0');
        return;
      };

       //Revisar cuando tengamos números negativos
      if( this.resultText().length === 2 && this.resultText().includes('-') ) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update( currentValue => currentValue.slice(0,-1) );
      return;
    };

    // Aplicar operadores
    if(operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    };

    //Limitar número de caracteres
    if(this.resultText().length >= 10) {
      console.log('Max values reached');
      return;
    }

    // Validar punto decimal
    if( value === '.' && !this.resultText().includes('.') ) {
      if( this.resultText() === '0' || this.resultText() === '' ) {
        this.resultText.set('0.');
        return;
      };
      this.resultText.update( currentValue=>currentValue + '.' );
      return;
    };

    // Manejo del cero inicial
    if(value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
       return;
    }

    // Cambiar signo
    if(value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(currentValue => currentValue.slice(1));
        return;
      }

      this.resultText.update(currentValue => '-' + currentValue);
      return;
    };

    // Números
    if(numbers.includes(value)) {
      if( this.resultText() === '0') {
        this.resultText.set(value);
        return;
      };

      if( this.resultText() === '-0' ) {
        this.resultText.set('-'+value)
        return;
      };


      this.resultText.update(currentValue => currentValue + value);
      return;
    }

  };

  public calculteResult() {
    const number = parseFloat( this.subResultText() );
    const number2 = parseFloat( this.resultText() );

    let result = 0;

    switch(this.lastOperator()) {
      case '+':
        if(this.subResultText().includes('-')) {
          result = number2 + number;
          result;
        }
        result = number + number2;
        break;
      case '-':
        result = number - number2;
        break;
      case '*':
        result = number * number2;
        break;
      case 'x':
        result = number * number2;
        break;
      case '/':
        result = number / number2;
        break;
      case '÷':
        result = number / number2;
        break;
        //TODO: Lógica para el operado de %
      /* case '%':
        result =  ;
        break; */
    };

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }

}
