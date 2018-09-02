import { Point } from '../../domain/point';
import { Parallelogram } from '../../domain/parallelogram';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export class InputValidator {

  parallelogramCanBeBuilt(userPoints: Point[]): ValidationResult {
    try {
      this.pointsAreDifferentOrElseThrow(userPoints);
      this.parallelogramCanBeBuiltOfElseThrow(userPoints);
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  private pointsAreDifferentOrElseThrow(userPoints: Point[]): void {
    if (userPoints[0].isEqualTo(userPoints[1]) || userPoints[0].isEqualTo(userPoints[1])) {
      throw new Error('Points cannot be the same');
    }
  }

  private parallelogramCanBeBuiltOfElseThrow(userPoints: Point[]): void {
    Parallelogram.givenThreePoints(userPoints[0], userPoints[1], userPoints[2]);
  }

}
