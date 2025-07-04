import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {Profile} from '../../../model/profile';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProfileDetails} from '../../../model/profile-details';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
  }

  profile: Profile;
  defaultPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/500px-Unknown_person.jpg';
  editing = false;
  profileComplete = false;
  messageAr = '';
  messageEn = '';
  errorAge = '';
  errorAddress = '';
  errorPhoneNumber = '';
  loadingUpdating = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => this.getProfile());
  }

  getProfile(): void {
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
        if (this.profile.accountDetails === null) {
          this.profile.accountDetails = new ProfileDetails();
        }
        if (this.profile.accountDetails.age && this.profile.accountDetails.phoneNumber && this.profile.accountDetails.address) {
          this.profileComplete = true;
        }
      },
      errors => {
        this.messageAr = errors.error.bundleMessage.message_ar;
        this.messageEn = errors.error.bundleMessage.message_en;
      }
    );
  }

  updateProfile(): void {
    if (!this.validationUpdateProfile()) {
      return;
    }
    this.loadingUpdating = true;
    this.authService.updateProfile(this.profile).subscribe(
      response => {
        this.editing = false;
        this.loadingUpdating = false;
        this.profileComplete = true;
        this.snackBar.open('Success Updated', 'Close', {
          duration: 3000, // milliseconds
          verticalPosition: 'top', // or 'bottom'
          panelClass: ['snackbar-success']
        });
      },
      errors => {
        this.loadingUpdating = false;
        this.resetData();
        this.messageAr = errors.error.bundleMessage.message_ar;
        this.messageEn = errors.error.bundleMessage.message_en;
        this.snackBar.open(`${this.messageEn}\n${this.messageAr}`, 'Close', {
          duration: 3000, // milliseconds
          verticalPosition: 'top', // or 'bottom'
          panelClass: ['snackbar-success']
        });
      }
    );
  }

  resetData(): void {
    this.profile = null;
    this.errorAge = '';
    this.errorAddress = '';
    this.errorPhoneNumber = '';
  }

// Validate profile update data
  validationUpdateProfile(): boolean {
    const details = this.profile?.accountDetails;

    // Reset previous errors
    this.errorAge = '';
    this.errorPhoneNumber = '';
    this.errorAddress = '';
    const {id, phoneNumber, age, address} = details;
    if (isNaN(age) || age < 18) {
      this.errorAge = 'Age must be a valid number and at least 18.';
      return false;
    }

    if (!phoneNumber?.trim()) {
      this.errorPhoneNumber = 'Phone number must not be empty.';
      return false;
    }

    const phonePattern = /^[0-9+\-() ]{7,15}$/;
    if (!phonePattern.test(phoneNumber.trim())) {
      this.errorPhoneNumber = 'Invalid phone number format.';
      return false;
    }

    if (!address?.trim()) {
      this.errorAddress = 'Address must not be empty.';
      return false;
    }

    return true;
  }

}
