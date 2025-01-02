import { Egg } from "./components/egg"
import { game } from "./components/game"
import React, { useState, useEffect } from "react"
import ProducersList from "./components/shop"

const egg = new Egg({ height: 400, width: 400 });

const DisplayEggs: React.FC = () => {
  const [eggs, setEggs] = useState(game.formatNumber(game.egg()));

  useEffect(() => {
    const interval = setInterval(() => {
      setEggs(game.formatNumber(game.egg()));
    }, 100);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []); // The empty array means this effect runs once after the first render

  return (
    <div 
      className="font-poppins text-3xl font-bold text-center mt-4"
    >{eggs} Eggs</div>
  );
};

export default function App(): JSX.Element {
  return (
    <div>
      <DisplayEggs />
      {egg.render()}
      <ProducersList />
    </div>
  )
}
