import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector:'[appSelectvalidator]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:SelectRequiredValidatorDirective,
        multi:true
    }]

})
export class SelectRequiredValidatorDirective implements Validator{
    validate(control: AbstractControl): {[key:string]:any} | null {
       return control.value===-1 || control.value===''?{'defaultSelected':true}:null;   
    }
    
}