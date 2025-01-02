class Game {
  private eggs: number; // Total eggs
  /* Earnings related */
  public epc: number; // Eggs per click

  constructor() {
    this.eggs = 0;
    this.epc = 1;
  }

  increment(): void {
    this.eggs += this.epc;
  }

  public formatNumber(num: number): string {
    const units = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

    let i = 0;
    while (num >= 1000 && i < units.length - 1) {
      num /= 1000;
      i++;
    }

    return num.toFixed(1) + ' ' + units[i];
  }

  public setEggs(eggs: number): void {
    this.eggs = eggs;
  }

  public egg(): number {
    return this.eggs;
  }
}

export const game = new Game();
