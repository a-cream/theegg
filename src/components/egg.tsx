import Img from "../assets/egg.png";
import { game, setGame } from "./game";
import { onMount } from "solid-js";

interface EggProps {
  height: number,
  width: number
}

export const Egg = (props: EggProps) => {
  let canvas: HTMLCanvasElement;
  onMount(() => {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (ctx) {
      const img = new Image();
      img.src = Img;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let drawWidth = props.width;
        let drawHeight = props.height;

        if (props.width / props.height > aspectRatio) {
          drawWidth = props.height * aspectRatio;
        } else {
          drawHeight = props.width / aspectRatio;
        }

        ctx.drawImage(img, 0, canvas.height / 4, drawWidth, drawHeight);
      };
    }
  })

  const handleOnClick = (event: MouseEvent) => {
    setGame("eggs", e => e += 1);

    const random: number = Math.floor(Math.random() * 20);
    const indicator = document.createElement('div');
    const uniqueId = `indicator-${Date.now()}-${Math.random()}`;
    indicator.id = uniqueId;
    indicator.style.userSelect = 'none';
    indicator.style.fontFamily = 'Poppins';
    indicator.innerText = '+' + game.epc;
    indicator.style.position = 'absolute';
    indicator.style.left = `${event.clientX - random}px`;
    indicator.style.top = `${event.clientY - 30}px`;
    indicator.style.fontSize = '20px';
    indicator.style.color = 'white';
    indicator.style.opacity = '1';
    indicator.style.transition = 'all 1s ease-out';

    document.body.appendChild(indicator);

    setTimeout(() => {
      indicator.style.top = `${event.clientY - 100}px`;
      indicator.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      const element = document.getElementById(uniqueId);
      if (element) {
        document.body.removeChild(element);
      }
    }, 1000);
  }

  const handleMouseMove = (event: MouseEvent) => {
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const pixel = ctx.getImageData(x, y, 1, 1).data;

      if (pixel[3] !== 0) {
        canvas.style.cursor = "pointer";
        canvas.style.transform = "scale(1.1)";
        canvas.style.transition = "transform 0.3s ease";
      } else {
        canvas.style.cursor = "auto";
        canvas.onclick = null;
        canvas.style.transform = "scale(1)";
      }
    }
  }

  return (
    <div class="grid place-items-center h-screen pb-52">
      <canvas onClick={handleOnClick} onMouseMove={handleMouseMove} ref={ref => canvas = ref} height={props.height} width={props.width}></canvas>
    </div>
  );
}
