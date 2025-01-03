import { saveProducers, loadProducersSave } from './shop';

class Game {
  private eggs: number; // Total eggs
  /* Earnings related */
  public epc: number; // Eggs per click

  constructor() {
    this.eggs = 0;
    this.epc = 1;

    this.save = this.save.bind(this);
    this.loadSave = this.loadSave.bind(this);
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

    return num.toFixed(0) + ' ' + units[i];
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
  }
}

export const game = new Game();
