import { game } from "./game";

export const Display = () => {
  return (
    <div>
      <div class="font-poppins text-3xl font-bold text-center mt-4 select-none text-white">
        {game.format(game.eggs, false)} Eggs
      </div>
      <div class="font-poppins text-2xl font-bold text-center select-none text-white">
        {game.format(game.eps, true)} Eps
      </div>
    </div>
  );
}
