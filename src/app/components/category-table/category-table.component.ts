import { Component, OnInit, ViewChild } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { categoryRow } from './category-row.model';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  constructor() { }

  public tableColumns = ['drag','category', 'sequence', 'saveDelete'];
  public categoryNames: string[] = [];
  public isCategorySaved: boolean = true;
  public totalCategoryRows: categoryRow[] = [];

  @ViewChild('categoryTable') categoryTable;

  ngOnInit() {
  }

  public onCategorySaveDelete(rowPosition: number, isSaved: boolean): void {
    if (!isSaved) {
      // User can save if category has been given a name
      if (this.categoryNames[rowPosition]) {
        this.totalCategoryRows[rowPosition].nameSaved = true;
        this.totalCategoryRows[rowPosition].name = this.categoryNames[rowPosition];
      }
    } else {
      // Remove both the row and its name from respective arrays
      this.totalCategoryRows.splice(rowPosition, 1);
      this.categoryNames.splice(rowPosition, 1);

      // Each row needs its sequence value updated after a deletion
      this.totalCategoryRows.forEach((row, index) => {
        row.sequence = index + 1;
      });
    }

    this.isCategorySaved = true;
    this.categoryTable.renderRows();
  }

  public onNewCategory(): void {
    // New categories can be created if the latest row has been saved
    if (this.isCategorySaved) {
      let newRow = new categoryRow();
      newRow.sequence = this.totalCategoryRows.length + 1;
      this.totalCategoryRows.push(newRow);
      this.isCategorySaved = false;
      this.categoryTable.renderRows();
    }
  }

  public onRowDropped(event): void {
    // reorder rows after position change
    moveItemInArray(this.totalCategoryRows, event.previousIndex, event.currentIndex);
    moveItemInArray(this.categoryNames, event.previousIndex, event.currentIndex);
    this.categoryTable.renderRows();
  }

}
