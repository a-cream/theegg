import { Shop } from "./components/shop";
import { Egg } from "./components/egg";
import { Display } from "./components/display";
import { Sign } from "./components/sign";
import { game } from "./components/game";

export default function App() {
  game.loadSave();

  setInterval(() => {
    game.save();
  }, 1000);

  return (
    <>
      <Sign />
      <Display />
      <Egg height={400} width={400} />
      <Shop />
    </>
  )
}
