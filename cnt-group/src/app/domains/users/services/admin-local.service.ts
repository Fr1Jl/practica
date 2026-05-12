import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../modules/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminLocalService {
  private storageKey = 'local_admins';
  private admins: Admin[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.admins = JSON.parse(saved);
    } else {
      // Начальные тестовые данные
      this.admins = [
        {
          admin_id: 1,
          admin_login: 'admin1',
          is_active_admin: true,
          admin_birth_date: '1990-01-01',
          created_at: new Date().toISOString()
        },
        {
          admin_id: 2,
          admin_login: 'admin2',
          is_active_admin: true,
          admin_birth_date: '1995-05-15',
          created_at: new Date().toISOString()
        }
      ];
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.admins));
  }

  private getNextId(): number {
    return this.admins.length > 0 ? Math.max(...this.admins.map(a => a.admin_id)) + 1 : 1;
  }

  getAllAdmins(includeInactive?: boolean): Observable<Admin[]> {
    let result = this.admins;
    if (!includeInactive) {
      result = result.filter(a => a.is_active_admin);
    }
    return of(result);
  }

  getAdminById(id: number): Observable<Admin | null> {
    const admin = this.admins.find(a => a.admin_id === id);
    return of(admin || null);
  }

  createAdmin(data: CreateAdminDto): Observable<Admin> {
    const newAdmin: Admin = {
      admin_id: this.getNextId(),
      admin_login: data.admin_login,
      is_active_admin: data.is_active_admin !== undefined ? data.is_active_admin : true,
      admin_birth_date: data.admin_birth_date || null,
      created_at: new Date().toISOString()
    };
    this.admins.push(newAdmin);
    this.saveToStorage();
    return of(newAdmin);
  }

  updateAdmin(id: number, data: UpdateAdminDto): Observable<Admin | null> {
    const index = this.admins.findIndex(a => a.admin_id === id);
    if (index === -1) return of(null);

    const updated = { ...this.admins[index] };
    if (data.admin_login !== undefined) updated.admin_login = data.admin_login;
    if (data.is_active_admin !== undefined) updated.is_active_admin = data.is_active_admin;
    if (data.admin_birth_date !== undefined) updated.admin_birth_date = data.admin_birth_date;

    this.admins[index] = updated;
    this.saveToStorage();
    return of(updated);
  }

  deleteAdmin(id: number, hard: boolean = true): Observable<boolean> {
    if (hard) {
      this.admins = this.admins.filter(a => a.admin_id !== id);
    } else {
      const index = this.admins.findIndex(a => a.admin_id === id);
      if (index !== -1) {
        this.admins[index].is_active_admin = false;
      }
    }
    this.saveToStorage();
    return of(true);
  }
}
