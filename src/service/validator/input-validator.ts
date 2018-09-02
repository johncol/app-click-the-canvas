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
    for (let i = 0; i < userPoints.length; i++) {
      for (let j = 0; j < userPoints.length; j++) {
        if (i !== j && userPoints[i].isEqualTo(userPoints[j])) {
          throw new Error('Points cannot be the same');
        }
      }
    }
  }

  private parallelogramCanBeBuiltOfElseThrow(userPoints: Point[]): void {
    Parallelogram.givenThreePoints(userPoints[0], userPoints[1], userPoints[2]);
  }

}
