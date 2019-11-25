import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.scss']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;
  constructor(private adminSvc: AdminService) {}

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminSvc.getPhotosForApproval().subscribe(
      photos => {
        this.photos = photos;
      },
      error => {
        console.log(error);
      }
    );
  }

  approvePhoto(photoId) {
    this.adminSvc.approvePhoto(photoId).subscribe(
      () => {
        this.photos.splice(
          this.photos.findIndex(p => p.id === photoId),
          1
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  rejectPhoto(photoId) {
    this.adminSvc.rejectPhoto(photoId).subscribe(
      () => {
        this.photos.splice(
          this.photos.findIndex(p => p.id === photoId),
          1
        );
      },
      error => {
        console.log(error);
      }
    );
  }
}
