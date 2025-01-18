import { createSignal, For } from "solid-js";
import { game, setGame } from "./game";
import Autoclicker from "../assets/shop/autoclicker.png";
import Border from "../assets/decoration/wood.jpg";

const originalWarn = console.warn;

console.warn = function(message, ...optionalParams) {
  if (message === "Cannot mutate a Store directly") {
    return;
  }

  originalWarn.apply(console, [message, ...optionalParams]);
};


export interface ProducerBaseProps {
  name: string,
  img: string,
  eps: number,
  cost: number,
  amount: number,
}

interface ProducerBaseOptions extends ProducerBaseProps {
  save?: boolean,
}

const ProducerBase = (options: ProducerBaseOptions) => {
  const { save, ...props } = options;
  if (save) {
    game.producers.push(props);
  }

  const [cost, setCost] = createSignal(props.cost);
  const [amount, setAmount] = createSignal(props.amount);

  const buy = (): void => {
    if (game.eggs >= props.cost) {
      setGame("eggs", e => e -= props.cost);
      setGame("producers", producers => {
        const index = producers.findIndex(p => p.name === props.name);
        if (index !== -1) {
          producers[index].cost *= 1.2;
          producers[index].amount++;
        }
        return producers;
      });
      setCost(props.cost * 1.2);
      setAmount(props.amount + 1);
    }
  }

  const [isClicked, setIsClicked] = createSignal(false);

  return (
    <div onClick={buy} onMouseDown={() => setIsClicked(true)} onMouseUp={() => setIsClicked(false)}
      style={{
        cursor: "pointer",
        "user-select": "none",
        height: "60px",
        border: isClicked() ? "inset 5px rgb(222,222,222)" : "outset 5px rgb(222,222,222)",
        "background-color": "white",
        position: "relative",
      }}>
      <img
        src={props.img}
        alt={props.name + " image"}
        height="50"
        width="50"
        style={{
          position: "absolute",
          left: "2.5px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></img>
      <div class="absolute right-2 font-poppins"
        style={{
          "font-size": "24px",
          top: "25%",
        }}>
        {amount()}
      </div>
      <div class="absolute bottom-0 font-poppins left-16">{game.format(cost(), false)}</div>
      <div class="absolute top-1 font-poppins left-16 text-xl">{props.name}</div>
    </div>
  );
}


export const Shop = () => {
  if (game.producers.length >= 1) {
    return (
      <div style={{
        position: "absolute",
        right: "0",
        top: "0",
        width: "20rem",
        height: "100vh",
        "border-image": `url(${Border}) 50 round`,
        "border-left": "10px solid",
        "background-color": "rgba(0,0,0,0.222)",
      }}>
        <For each={game.producers} fallback={<div>Loading...</div>}>
          {(item) => <ProducerBase name={item.name} img={item.img} eps={item.eps} cost={item.cost} amount={item.amount} save={true} />}
        </For>
      </div>
    )
  } else {
    return (
      <div style={{
        position: "absolute",
        right: "0",
        top: "0",
        width: "20rem",
        height: "100vh",
        "border-image": `url(${Border}) 50 round`,
        "border-left": "10px solid",
        "background-color": "rgba(0,0,0,0.222)",
      }}>
        <ProducerBase name="Autoclicker" img={Autoclicker} eps={0.1} cost={10} amount={0} save={true} />
      </div>
    )
  }
}
