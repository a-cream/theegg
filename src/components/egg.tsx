import Img from '../assets/egg.png';
import { game } from './game';
import { Component } from 'react';

interface EggProps {
  height: number;
  width: number;
}

export class Egg extends Component<EggProps> {
  constructor(props: EggProps) {
    super(props);
    this.onClick = this.onClick.bind(this) as (event: MouseEvent) => void;
  }

  public onClick(event: MouseEvent): void {
    game.increment();

    const random: number = Math.floor(Math.random() * 20);
    const indicator = document.createElement('div');
    const uniqueId = `indicator-${Date.now()}-${Math.random()}`;
    indicator.id = uniqueId;
    indicator.style.userSelect = 'none';
    indicator.style.fontFamily = 'Poppins';
    indicator.innerText = '+' + game.epc;
    indicator.style.position = 'absolute';
    indicator.style.left = `${event.clientX-random}px`;
    indicator.style.top = `${event.clientY-20}px`;
    indicator.style.fontSize = '20px';
    indicator.style.color = 'black';
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
    const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      img.style.transform = "scale(1.1)";
      img.style.transition = "transform 0.3s ease";
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      img.style.transform = "scale(1)";
    };

    const { height, width } = this.props;
    return (
      <div className="grid place-items-center h-screen">
        <img
          src={Img}
          height={height}
          width={width}
          onClick={(e) => this.onClick(e.nativeEvent)}
          style={{
            cursor: 'pointer',
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></img>
      </div>
    )
  }
}
