import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Admin } from '../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit, OnChanges {

  public userForm: FormGroup;
  public showDefault;
  public existingUser = false;
  public userIndex = -1;

  @Input('user') public user: User;
  @Input('users') public users: User[];
  @Input('admin_id') public admin_id: Admin;
  @Input('reset_form') public reset_form: EventEmitter<boolean>;
  @Output('saveNewUser') public saveNewUser = new EventEmitter<Object>();
  @Output('deleteUser') public deleteUser = new EventEmitter<Object>();

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  get invalidName() {
    return this.userForm.get('userName').invalid && this.userForm.get('userName').touched
  }
  get invalidLastname() {
    return this.userForm.get('userLastName').invalid && this.userForm.get('userLastName').touched
  }
  get invalidIban() {
    return this.userForm.get('IBAN').invalid && this.userForm.get('IBAN').touched
  }

  ngOnInit() {
    this.showDefault = true;
    this.reset_form.subscribe(reset => {
      if (reset) {
        this.showDefault = false;
        this.userForm.reset();
      }
    });
  }
  
  public ngOnChanges() {
    if (this.user) {
      this.showDefault = false;
      this.userForm.controls.userName.setValue(this.user.name);
      this.userForm.controls.userLastName.setValue(this.user.lastName);
      this.userForm.controls.IBAN.setValue(this.user.IBAN);
      this.existingUser = this.users.includes(this.user) ? true : false;
      this.userIndex = this.users.indexOf(this.user);
    } else {
      this.userForm.controls.userName.setValue('');
      this.userForm.controls.userLastName.setValue('');
      this.userForm.controls.IBAN.setValue('');
      this.existingUser = false;
    }
  }
  
  public saveData() {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach( control => {
        control.markAsTouched();
      });
    } else {
        this.saveNewUser.emit({userForm: this.userForm, edit: this.existingUser, userIndex: this.userIndex});
    }
    
  }
  
  public deleteData() {
    this.deleteUser.emit({user: this.user, edit: this.existingUser, userIndex: this.userIndex});
    this.userForm.reset();
    this.showDefault = true;
  }
  
  public crearFormulario() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userLastName: ['', Validators.required],
      IBAN: ['', Validators.required]
    });
  }

}
