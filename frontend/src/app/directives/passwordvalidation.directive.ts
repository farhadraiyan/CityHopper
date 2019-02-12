import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordvalidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordvalidationDirective,
    multi: true
  }]
})
export class PasswordvalidationDirective implements Validator {
  @Input() appPasswordvalidation: string;
  //if the validation success it will return a null, else it will return a key value pair object
  validate(control: AbstractControl ): {[key:string]: any} | null{
    const controlToCompare = control.parent.get(this.appPasswordvalidation);
    if(controlToCompare && controlToCompare.value !== control.value){
      return {'notEqual': true}
    }else{
      return null
    }
  }
  //constructor() { }

}
