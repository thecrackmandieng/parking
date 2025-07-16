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

  newParking = {
    name: '',
    capacity: null as number | null,
    location: ''
  };
  selectedFile: File | null = null;

  showModal = false;

  editParking: any = {};
  selectedEditFile: File | null = null;
  showEditModal = false;

  parkingToBlock: any = null;
  showBlockModal = false;

  parkingToDelete: any = null;
  showDeleteModal = false;

  showViewModal = false;
  viewParking: any = {};

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings(): void {
    this.parkingService.getParkings().subscribe(parkings => {
      this.parkings = parkings;
    });
  }

  // Modal Ajout
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newParking = { name: '', capacity: null, location: '' };
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  submitForm(event: Event): void {
    event.preventDefault();
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.newParking.name);
    formData.append('capacity', (this.newParking.capacity ?? 0).toString());
    formData.append('location', this.newParking.location);
    formData.append('image', this.selectedFile);

    this.parkingService.addParking(formData).subscribe(() => {
      this.loadParkings();
      this.closeModal();
    });
  }

  // Modal Edition
  openEditModal(parking: any) {
    this.editParking = { ...parking };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedEditFile = null;
  }

  onEditFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedEditFile = file;
  }

  submitEditForm(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', this.editParking.name);
    formData.append('capacity', (this.editParking.capacity ?? 0).toString());
    formData.append('location', this.editParking.location);
    if (this.selectedEditFile) {
      formData.append('image', this.selectedEditFile);
    }

    this.parkingService.updateParking(this.editParking._id, formData).subscribe(() => {
      this.loadParkings();
      this.closeEditModal();
    });
  }

  // Modal Blocage
  openBlockModal(parking: any) {
    this.parkingToBlock = parking;
    this.showBlockModal = true;
  }

  closeBlockModal() {
    this.showBlockModal = false;
    this.parkingToBlock = null;
  }

  confirmBlock() {
    // TODO: Implémenter la logique de blocage côté backend
    console.log('Blocage confirmé pour', this.parkingToBlock);
    this.closeBlockModal();
  }

  // Modal Suppression
  openDeleteModal(parking: any) {
    this.parkingToDelete = parking;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.parkingToDelete = null;
  }

  confirmDelete() {
    this.parkingService.deleteParking(this.parkingToDelete._id).subscribe(() => {
      this.loadParkings();
      this.closeDeleteModal();
    });
  }

  // Modal Vue
  openViewModal(parking: any) {
    this.viewParking = parking;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewParking = {};
  }
}
