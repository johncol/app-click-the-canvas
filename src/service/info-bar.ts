import { Point } from '../domain/point';

export class InfoBar {
  private table: HTMLElement;

  constructor(tableId: string) {
    this.table = document.getElementById(tableId) as HTMLElement;
  }

  displayPointInfo(point: Point): void {
    this.addRow(`Point ${this.table.children.length + 1}`, point);
  }

  displayCenterOfMassInfo(centerOfMass: Point): void {
    this.addRow('Center of mass', centerOfMass);
  }

  displayAreaInfo(area: number): void {
    this.addRow('Area', area.toFixed(1));
  }

  private addRow(field: string, value: any): void {
    const th: HTMLElement = this.createElement('th', field);
    const td: HTMLElement = this.createElement('td', String(value));
    const tr: HTMLElement = this.createElementContaining('tr', [th, td]);
    this.table.appendChild(tr);
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
