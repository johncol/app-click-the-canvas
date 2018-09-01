import { Point } from '../domain/point';
import { Parallelogram } from '../domain/parallelogram';

type InfoRow = HTMLElement;

export class InfoBar {
  private table: HTMLElement;

  constructor(tableId: string) {
    this.table = document.getElementById(tableId) as HTMLElement;
  }

  public displayInfoFor(element: Point | Parallelogram): void {
    if (element instanceof Point) {
      this.displayPointInfo(element);
    } else if (element instanceof Parallelogram) {
      this.displayParallelogramInfo(element);
    } else {
      console.warn('Unknown element to display:', element);
    }
  }

  private displayPointInfo(point: Point): void {
    const row: HTMLElement = this.addRow(`Point ${this.table.children.length + 1}`, point);
    point.whenMoved.subscribe({
      next: () => this.updateRow(row, point)
    });
  }

  private displayParallelogramInfo(parallelogram: Parallelogram): void {
    this.displayCenterOfMassInfo(parallelogram);
    this.displayAreaInfo(parallelogram);
  }

  private displayCenterOfMassInfo(parallelogram: Parallelogram): void {
    const row: InfoRow = this.addRow('Center of mass', parallelogram.centerOfMass);
    parallelogram.whenMoved.subscribe({
      next: () => this.updateRow(row, parallelogram.centerOfMass)
    });
  }

  private displayAreaInfo(parallelogram: Parallelogram): void {
    const row: InfoRow = this.addRow('Area', parallelogram.area.toFixed(1));
    parallelogram.whenMoved.subscribe({
      next: () => this.updateRow(row, parallelogram.area.toFixed(0))
    });
  }

  private addRow(field: string, value: any): HTMLElement {
    const th: HTMLElement = this.createElement('th', field);
    const td: HTMLElement = this.createElement('td', String(value));
    const tr: HTMLElement = this.createElementContaining('tr', [th, td]);
    this.table.appendChild(tr);
    return tr;
  }

  private updateRow(row: InfoRow, value: any): void {
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
