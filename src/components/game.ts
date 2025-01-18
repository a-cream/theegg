import { createStore } from "solid-js/store";
import { ProducerBaseProps } from "./shop";

type Game = {
  name: string,
  eggs: number,
  eps: number,
  epc: number,
  producers: Array<ProducerBaseProps>,
  format: (num: number, decimal: boolean) => string,
  save: () => void,
  loadSave: () => void
}

const format = (num: number, decimal: boolean): string => {
  const units = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

  let i = 0;
  while (num >= 1000 && i < units.length - 1) {
    num /= 1000;
    i++;
  }

  return decimal ? num.toFixed(1) + ' ' + units[i] : num.toFixed(0) + ' ' + units[i];
}

const save = (): void => {
  const gameSave = {
    name: game.name,
    eggs: game.eggs,
    eps: game.eps,
    epc: game.epc,
    producers: game.producers,
  }

  localStorage.setItem("game", JSON.stringify(gameSave));
}

const loadSave = (): void => {
  const gameSave: string | null = localStorage.getItem("game");

  if (gameSave) {
    const parsedSave: Record<any, number & string> = JSON.parse(gameSave);
    setGame("name", () => parsedSave.name);
    setGame("eggs", () => parsedSave.eggs);
    setGame("eps", () => parsedSave.eps);
    setGame("epc", () => parsedSave.epc);
    setGame("producers", () => parsedSave.producers || []);
  }
}

setInterval(() => {
  let result: number = 0;
  for (let i = 0; i < game.producers.length; i++) {
    result += game.producers[i].eps * game.producers[i].amount;
  }
  setGame("eps", e => e = result);
}, 100)

setInterval(() => {
  setGame("eggs", e => e += game.eps / 10);
}, 100)

const initialState: Game = {
  name: "Your name",
  eggs: 0,
  eps: 0,
  epc: 1,
  producers: [],
  format,
  save,
  loadSave
};

export const [game, setGame] = createStore<Game>(initialState);
