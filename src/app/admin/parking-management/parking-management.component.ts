import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-parking-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.css']
})
export class ParkingManagementComponent implements OnInit {
  parkings: any[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings(): void {
    this.parkingService.getParkings().subscribe(parkings => {
      this.parkings = parkings;
    });
  }

  addParking(name: string): void {
    this.parkingService.addParking({ name }).subscribe(() => {
      this.loadParkings(); // Recharger les parkings pour inclure le nouveau parking ajouté
    });
  }

  deleteParking(parkingId: string): void {
    this.parkingService.deleteParking(parkingId).subscribe(() => {
      this.loadParkings(); // Recharger les parkings après la suppression
    });
  }
}
