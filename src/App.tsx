import { Egg } from "./components/egg"
import { game } from "./components/game"
import React, { useState, useEffect } from "react"
import ProducersList from "./components/shop"

const egg = new Egg({ height: 400, width: 400 });

const DisplayEggs: React.FC = () => {
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
      <div className="font-poppins text-3xl font-bold text-center mt-4">
        {eggs} Eggs
      </div>
      <div className="font-poppins text-2xl font-bold text-center">
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

  return (
    <div>
      <DisplayEggs />
      {egg.render()}
      <ProducersList />
    </div>
  )
}
