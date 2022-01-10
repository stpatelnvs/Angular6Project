import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  
  employeeForm!: FormGroup;
  fullNameLength = 0;
  
  
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors: { [key: string]: any } = {
    
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  // formErrors : { [fullName: string]: any } && validationMessages : { [key: string]: any }
  
  // This object contains all the validation messages for this form
  // solution
  // formErrors : { [key: string]: any } && validationMessages : { [key: string]: any }
  
  
  validationMessages: { [key: string]: any } = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }
  };
  
  constructor(private fb: FormBuilder) { }
  
  
  logValidationErrors(group: FormGroup): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method

      this.fullNameLength = this.fullNameLength + 1;

      // console.log('ccc  '+this.fullNameLength+'    kk'+this.f);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // If the control is a FormControl
      } else {
        // Clear the existing validation errors
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          // Get all the validation messages of the form control
          // that has failed the validation

          const messages = this.validationMessages[key];


          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  onLoadDataClick(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }



  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(10)],
      email: ['', Validators.required, Validators.minLength(2), Validators.maxLength(10)],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['beginner', Validators.required]
      })
    });



    // this.employeeForm.valueChanges.subscribe((data) => {
    //   this.logValidationErrors(this.employeeForm);
    // });
  }

  logValidation(group: FormGroup) {

    Object.keys(group.controls).forEach((key: string) => {
      const ab = group.get(key);
      console.log('key =' + key + '' + 'ab= ' + ab);
      if (ab && !ab.valid) {
        console.log(key);
        const messages = this.validationMessages['fullName'];
        //console.log(messages.max + 'invalid')

      }
      else {
        console.log('valid')
      }
      if (ab instanceof FormGroup) {
        this.logValidation(ab);
      }
      else {
        if (ab && !ab.valid) {
          const messages = this.validationMessages;
          console.log(ab)

        }

      }
    })

  }
  logKeyValue(group: FormGroup) {

    Object.keys(group.controls).forEach((key: string) => {
      const ab = group.get(key);
      if (ab instanceof FormGroup) {
        this.logKeyValue(ab);
      }
      else {
        console.log('key = ' + key + ' value = ' + ab?.value)
      }
    })

  }

  /*  onLoadDataClick() {
     // this.logKeyValue(this.employeeForm);
     this.logValidation(this.employeeForm);
   } */
  onLoadDataClick1() {
    this.employeeForm.patchValue({
      fullName: 'sunil',
      email: '',
      phone: '',
      skills: {
        skillName: 'new skill',
        experienceInYears: 'new experienceInYears',
        // proficiency: 'new proficiency'
      }
    })
  }

  onSubmit(): void {

    console.log(this.employeeForm.get('fullName')?.valueChanges.subscribe((val: string) => console.log(this.fullNameLength = val.length)));
    // this.employeeForm.get('fullName')?.valueChanges.subscribe((val:string) =>console.log(this.fullNameLength=val.length));
  }


}
