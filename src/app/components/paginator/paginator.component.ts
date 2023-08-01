import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  private _rows = 20;
  private _totalRecords = 0;
  paginatorState: any;
  @Input() rowsPerPageOptions: number[] = [];
  @Input()
  set totalRecords(total: number) {
    this._totalRecords = total;
    this.lastPage = Math.ceil(total / this.rows);
  }
  get totalRecords() {
    return this._totalRecords;
  }
  @Input()
  set rows(rows: number) {
    this._rows = rows;
    this.lastPage = Math.ceil(this.totalRecords / rows);
  }
  get rows() {
    return this._rows;
  }
  @Input() currentPage = 1;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();

  lastPage = this.currentPage;
  pageLinks: number[] = [];
  // _first: number = 0;

  ngOnInit(): void {
    this.updatePageLinks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalRecords']) {
      console.log('changes total', this.totalRecords, this.rows, this.currentPage);
      // this.updatePageLinks();
      this.changePageToFirst();
    }
    if (changes['row']) {
      console.log('changes row', this.totalRecords, this.rows, this.currentPage);
      this.changePageToFirst();
    }
    if (changes['currentPage']) {
      console.log('changes current', this.totalRecords, this.rows, this.currentPage);
      this.updatePageLinks();
    }
  }

  getPageCount() {
    return Math.floor(this.totalRecords/this.rows) || 1;
  }

  calculatePageLink() {
    const numberOfPages = this.getPageCount();
    const visiblePages = 5;
    const rangeMiddle = Math.floor(visiblePages / 2);
    let start = Math.max(this.currentPage - rangeMiddle, 1);
    let end = Math.min(this.currentPage + rangeMiddle, numberOfPages);
    if (end - start < visiblePages) {
      if (start == 1) {
        end = start + visiblePages - 1;
      }
      if (end == numberOfPages) {
        start = end - visiblePages + 1;
      }
    }
    return [start, end];
  }

  updatePageLinks() {
    this.pageLinks = [];
    const resultCalculatePageLink = this.calculatePageLink();
    const start = resultCalculatePageLink[0];
    const end = resultCalculatePageLink[1]
    for (let i = start; i <= end; i++) {
      this.pageLinks.push(i);
    }
  }

  updatePaginatorState(page: number) {
    this.paginatorState = {
      page: page,
      pageCount: this.getPageCount(),
      rows: Number(this.rows),
      totalRecords: this.totalRecords
    }
  }

  changePage(p: number) {
    this.updatePaginatorState(p)
    this.onPageChange.emit(this.paginatorState);
  }

  changeRow() {
    this.changePage(1);
  }

  changePageToFirst() {
    this.changePage(1);
  }

  changePageToLast() {
    const numberOfPages = this.getPageCount();
    this.changePage(numberOfPages);
  }

  onPageLinkClick(event: any, page: number) {
    this.changePage(page);
  }

  changePageToPrev(event: any) {
    this.changePage(this.currentPage - 1);
  }

  changePageToNext(event: any) {
    this.changePage(this.currentPage + 1);
  }

}
