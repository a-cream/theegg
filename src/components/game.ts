import { saveProducers, loadProducersSave, totalEps } from './shop';

class Game {
  private eggs: number; // Total eggs
  /* Earnings related */
  public epc: number; // Eggs per click
  public eps: number; // Eggs per second

  constructor() {
    this.eggs = 0;
    this.epc = 1;
    this.eps = 0;

    this.save = this.save.bind(this);
    this.loadSave = this.loadSave.bind(this);
  }

  increment(): void {
    this.eggs += this.epc;
  }

  public formatNumber(num: number, decimal: boolean): string {
    const units = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

    let i = 0;
    while (num >= 1000 && i < units.length - 1) {
      num /= 1000;
      i++;
    }

    return decimal ? num.toFixed(1) + ' ' + units[i] : num.toFixed(0) + ' ' + units[i];
  }

  public setEggs(eggs: number): void {
    this.eggs = eggs;
  }

  public egg(): number {
    return this.eggs;
  }

  public save(): void {
    const gameSave = {
      eggs: this.eggs,
      epc: this.epc
    }

    localStorage.setItem("main", JSON.stringify(gameSave));
    saveProducers();
  }

  public loadSave(): void {
    const jsonGameSave: string | null = localStorage.getItem("main");

    if (jsonGameSave) {
      const gameSave = JSON.parse(jsonGameSave);
      this.eggs = gameSave.eggs;
      this.epc = gameSave.epc;
    }
    loadProducersSave();
    this.eps = totalEps();
  }
}

export const game = new Game();
