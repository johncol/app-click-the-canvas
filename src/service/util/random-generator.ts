export class RandomGenerator {

  static identifier(): string {
    return String(new Date().getTime()) + Math.round(Math.random() * 1000000);
  }

}
