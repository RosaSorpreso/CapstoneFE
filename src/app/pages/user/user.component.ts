import { Component } from '@angular/core';
import { iUserComplete } from '../../Models/i-user-complete';
import { AuthService } from '../../services/auth.service';
import { iUserRegistered } from '../../Models/i-user-registered';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iCategory } from '../../Models/i-category';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user: iUserRegistered | undefined;
  userComplete: iUserComplete | undefined;
  userId!: number;
  categoryForm: FormGroup;
  categories: iCategory[] = []

  constructor(
    private authSvc: AuthService,
    private categorySvc: CategoryService,
    private fb: FormBuilder
  ){
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
      if(user){
        this.userId = user.id
        this.authSvc.getUserById(this.userId).subscribe(user => {
          this.userComplete = user
        })
      }
    })

    this.categorySvc.category$.subscribe(categories => {
      this.categories = categories
    })
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categorySvc.createCategory(this.categoryForm.value)
      .subscribe({
        next: (addedTravel) => {
          this.categories.push(addedTravel);
          this.categoryForm.reset();
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }

}
