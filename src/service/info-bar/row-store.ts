import { Point } from '../../domain/point';

export class RowStore {
  private readonly pointRows: Map<string, InfoRow> = new Map();

  savePointRow(point: Point, row: InfoRow): void {
    this.pointRows.set(point.id, row);
  }

  getRowForPoint(point: Point): InfoRow {
    return this.pointRows.get(point.id) as InfoRow;
  }
}
