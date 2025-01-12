import Img from '../assets/egg.png';
import { game } from './game';
import React, { Component, useEffect } from 'react';

interface DimensionProps {
  height: number;
  width: number;
}

interface CanvasProps extends DimensionProps {
  onclick: (e: MouseEvent) => void
}

const Canvas: React.FC<CanvasProps> = (props: CanvasProps): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
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
    }
  }, [props.height, props.width]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const pixel = ctx.getImageData(x, y, 1, 1).data;

        if (pixel[3] !== 0) {
          canvas.style.cursor = "pointer";
          canvas.onclick = props.onclick;
          canvas.style.transform = "scale(1.1)";
          canvas.style.transition = "transform 0.3s ease";
        } else {
          canvas.style.cursor = "auto";
          canvas.onclick = null;
          canvas.style.transform = "scale(1)";

        }
      }
    }
  }

  return (
    <canvas 
      ref={canvasRef} 
      height={props.height} 
      width={props.width} 
      onMouseMove={handleMouseMove}
      style={{ transition: "transform 0.3s ease", }}
    ></canvas>
  );
}


export class Egg extends Component<DimensionProps> {
  constructor(props: DimensionProps) {
    super(props);
    this.onClick = this.onClick.bind(this) as (event: MouseEvent) => void;
  }

  private onClick(event: MouseEvent): void {
    game.increment();

    const random: number = Math.floor(Math.random() * 20);
    const indicator = document.createElement('div');
    const uniqueId = `indicator-${Date.now()}-${Math.random()}`;
    indicator.id = uniqueId;
    indicator.style.userSelect = 'none';
    indicator.style.fontFamily = 'Poppins';
    indicator.innerText = '+' + game.formatNumber(game.epc, false);
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

  public render(): JSX.Element {
    const { height, width } = this.props;
    return (
      <div className="grid place-items-center h-screen pb-52">
        <Canvas height={height} width={width} onclick={this.onClick} />
      </div>
    )
  }
}
