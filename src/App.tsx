import { Egg } from "./components/egg";
import { game } from "./components/game";
import Extra from "./components/extra";
import ProducersList from "./components/shop";
import BackgroundImg from "./assets/decoration/background.png";
import React, { useState, useEffect } from "react";

const EggInfo: React.FC = (): JSX.Element => {
  const [eggs, setEggs] = useState(game.formatNumber(game.egg(), false));
  const [eps, setEps] = useState(game.formatNumber(game.eps, true));

  useEffect(() => {
    const interval = setInterval(() => {
      setEggs(game.formatNumber(game.egg(), false));
      setEps(game.formatNumber(game.eps, true));
    }, 100);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []); // The empty array means this effect runs once after the first render

  return (
    <div>
      <div className="font-poppins text-3xl font-bold text-center mt-4 select-none text-white">
        {eggs} Eggs
      </div>
      <div className="font-poppins text-2xl font-bold text-center select-none text-white">
        {eps} Eps
      </div>
    </div>
  );
};

export default function App(): JSX.Element {
  game.loadSave();

  setInterval(() => {
    game.save();
  }, 1000);

  document.body.style.backgroundImage = `url(${BackgroundImg})`;
  document.body.style.backgroundSize = "45%";
  document.body.style.backgroundRepeat = "repeat";

  return (
    <div>
      <Extra name="Gello"/>
      <EggInfo />
      <Egg height={400} width={400} />
      <ProducersList />
    </div>
  )
}
