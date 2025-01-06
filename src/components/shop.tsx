import { game } from "./game";
import React, { useState, useEffect } from "react";

import BorderImg from "../assets/decoration/wood.jpg";
import AutoClickerImg from "../assets/shop/autoclicker.png";
import ChickenImg from "../assets/shop/chicken.png";

interface ProducerProps {
  eps: number;
  cost: number;
  name: string;
  img: string;
}

class ProducerBase {
  public name: string;
  public eps: number;
  public amount: number;
  public cost: number;
  public img: string;

  constructor(props: ProducerProps) {
    this.eps = props.eps;
    this.cost = props.cost;
    this.name = props.name;
    this.img = props.img;
    this.amount = 0;
    this.buy = this.buy.bind(this);
    this.start();
  }

  private start(): void {
    setInterval(() => {
      if (this.amount >= 1) {
        game.setEggs(game.egg() + this.eps * this.amount / 10);
      }
    }, 100);
  }

  public buy(): void {
    if (game.egg() >= this.cost) {
      game.setEggs(game.egg() - this.cost);
      this.amount++;
      this.cost = Math.ceil(this.cost * 1.2);
    }

    game.eps = totalEps();
  }

  render(): JSX.Element {
    const Update: React.FC = () => {
      const [amount, setAmount] = useState(this.amount);
      const [cost, setCost] = useState(game.formatNumber(this.cost, false));

      const [isclicked, setIsclicked] = useState(false);

      useEffect(() => {
        const interval = setInterval(() => { setCost(game.formatNumber(this.cost, false)); setAmount(this.amount); }, 100);
        return () => clearInterval(interval);
      }, [])

      return (
        <div onClick={this.buy} onMouseDown={() => setIsclicked(true)} onMouseUp={() => setIsclicked(false)}
          style={{
            cursor: "pointer",
            userSelect: "none",
            height: "60px",
            border: isclicked ? "inset 5px rgb(222,222,222)" : "outset 5px rgb(222,222,222)",
            backgroundColor: "white",
            position: "relative",
          }}>
          <img
            src={this.img}
            alt={this.name + " image"}
            height="50"
            width="50"
            style={{
              position: "absolute",
              left: "2.5px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          ></img>
          <div className="absolute right-2 font-poppins font-bold"
            style={{
              fontSize: "24px",
              top: "25%",
            }}>
            {amount}
          </div>
          <div className="absolute bottom-0 font-poppins left-16">{cost}</div>
          <div className="absolute top-1 font-poppins left-16 font-bold text-xl">{this.name}</div>
        </div>
      );
    }
    return <Update />;
  }
}

class AutoClicker extends ProducerBase {
  constructor() {
    super({ eps: 0.1, cost: 10, name: "Autoclicker", img: AutoClickerImg });
  }
}

class Chicken extends ProducerBase {
  constructor() {
    super({ eps: 1, cost: 100, name: "Chicken", img: ChickenImg });
  }
}

const producers = [
  new AutoClicker(),
  new Chicken(),
];

interface ProducerStructure {
  name: string;
  eps: number;
  amount: number;
  cost: number;
  img: string;
}

export const saveProducers = (): void => {
  const producersState = producers.map(producer => ({
    name: producer.name,
    eps: producer.eps,
    amount: producer.amount,
    cost: producer.cost,
    img: producer.img,
  }));
  localStorage.setItem("producers", JSON.stringify(producersState));
};

export const loadProducersSave = (): void => {
  const savedProducers = localStorage.getItem("producers");
  if (savedProducers) {
    const producersState = JSON.parse(savedProducers) as ProducerStructure[];
    producersState.forEach((savedProducer) => {
      const producer = producers.find(p => p.name === savedProducer.name);
      if (producer) {
        producer.amount = savedProducer.amount;
        producer.cost = savedProducer.cost;
      }
    });
  }
};

export const totalEps = (): number => {
  let total = 0;
  producers.forEach(producer => {
    total += producer.eps * producer.amount;
  });
  return total;
}

const ProducersList: React.FC = (): JSX.Element => {
  return (
    <div className="absolute right-0 top-0 w-80 h-screen" style={{
      borderImage: `url(${BorderImg}) 50 round`,
      borderLeft: "10px solid",
      backgroundColor: "rgba(0,0,0,0.222)",
    }}>
      {producers.map((producer, index) => (
        <div key={index}>{producer.render()}</div>
      ))}
    </div>
  );
};

export default ProducersList;
