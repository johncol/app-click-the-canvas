import { Point } from '../../domain/point';
import { Parallelogram } from '../../domain/parallelogram';
import { RowStore } from './row-store';

export class InfoBar {
  private readonly table: HTMLElement;

  constructor(
    tableId: string,
    private readonly store: RowStore = new RowStore(),
  ) {
    this.table = document.getElementById(tableId) as HTMLElement;
  }

  displayPointInfo(point: Point): void {
    const row: InfoRow = this.addRow(`Point ${this.table.children.length + 1}`, point);
    this.store.savePointRow(point, row);
    point.whenUpdated(() =>
      this.updateRowValue(row, point)
    );
  }

  displayParallelogramInfo(parallelogram: Parallelogram): void {
    this.displayCenterOfMassInfo(parallelogram);
    this.displayAreaInfo(parallelogram);
  }

  updatePointInfo(point: Point): void {
    const row: InfoRow = this.store.getRowForPoint(point);
    this.updateRowValue(row, point);
  }

  private displayCenterOfMassInfo(parallelogram: Parallelogram): void {
    const row: InfoRow = this.addRow('Center of mass', parallelogram.centerOfMass);
    parallelogram.whenUpdated(() =>
      this.updateRowValue(row, parallelogram.centerOfMass)
    );
  }

  private displayAreaInfo(parallelogram: Parallelogram): void {
    const row: InfoRow = this.addRow('Area', parallelogram.area.toFixed(0));
    parallelogram.whenUpdated(() =>
      this.updateRowValue(row, parallelogram.area.toFixed(0))
    );
  }

  private addRow(field: string, value: any): InfoRow {
    const th: HTMLElement = this.createElement('th', field);
    const td: HTMLElement = this.createElement('td', String(value));
    const tr: InfoRow = this.createElementContaining('tr', [th, td]);
    this.table.appendChild(tr);
    return tr;
  }

  private updateRowValue(row: InfoRow, value: any): void {
    row.children.item(1).innerHTML = String(value);
  }

  private createElement(element: string, innerHtml: string): HTMLElement {
    const htmlElement: HTMLElement = document.createElement(element);
    htmlElement.innerHTML = innerHtml;
    return htmlElement;
  }

  private createElementContaining(element: string, children: HTMLElement[]): HTMLElement {
    const htmlElement: HTMLElement = document.createElement(element);
    children.forEach(child => htmlElement.appendChild(child));
    return htmlElement;
  }
}
