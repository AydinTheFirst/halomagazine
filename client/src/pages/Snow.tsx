import { useEffect } from "react";
import snowflake from "../assets/snowflake.svg";

class Flake {
  x: number;
  y: number;
  speed: number;
  size: number;
  constructor(x: number, y: number, speed: number, size: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
  }

  update = () => {
    this.y += this.speed;
    if (this.y >= window.innerHeight) this.y = 0;
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    // draw snowflake
    ctx.drawImage(
      document.getElementById("snowflake") as HTMLImageElement,
      this.x,
      this.y,
      this.size,
      this.size
    );
  };
}

export const Snow = () => {
  useEffect(() => {
    const canvas = document.getElementById("snow") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(ctx);
  }, []);

  // adjust according to window size
  const maxFlakes = Math.round(window.innerWidth / 85);

  const flakes: any[] = [];

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    while (flakes.length < maxFlakes) {
      flakes.push(
        new Flake(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() * 1 + 1,
          Math.random() * 20 + 10
        )
      );
    }

    flakes.forEach((flake) => {
      flake.update();
      flake.draw(ctx);
    });

    requestAnimationFrame(() => draw(ctx));
  };

  window.addEventListener("resize", () => {
    const canvas = document.getElementById("snow") as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return (
    <>
      <canvas
        id="snow"
        className="snow absolute top-0 left-0 h-[100vh] w-full"
      ></canvas>

      <img id="snowflake" src={snowflake} alt="" className="invisible" />
    </>
  );
};
