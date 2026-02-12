import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() columnHeaders: string[] = [];
  @Input() data: any[] = [];
  @Output() rowClick = new EventEmitter<any>();
  dataKeys: string[] = [];

  ngOnChanges() {
    if (this.data.length > 0) {
      this.dataKeys = Object.keys(this.data[0]);
    }
  }

  onRowClick(user: any) {
    this.rowClick.emit(user);
  }
}