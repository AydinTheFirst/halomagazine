import { useEffect } from "react";

import snowflake from "../assets/snowflakes/snowflake-svgrepo-com.svg";
import snowflake1 from "../assets/snowflakes/snowflake-svgrepo-com (1).svg";
import snowflake2 from "../assets/snowflakes/snowflake-svgrepo-com (2).svg";
import snowflake3 from "../assets/snowflakes/snowflake-svgrepo-com (3).svg";
import snowflake4 from "../assets/snowflakes/snowflake-svgrepo-com (4).svg";
import snowflake5 from "../assets/snowflakes/snowflake-svgrepo-com (5).svg";
import snowflake6 from "../assets/snowflakes/snowflake-svgrepo-com (6).svg";
import snowflake7 from "../assets/snowflakes/snowflake-svgrepo-com (7).svg";
import snowflake8 from "../assets/snowflakes/snowflake-svgrepo-com (8).svg";
import snowflake9 from "../assets/snowflakes/snowflake-svgrepo-com (9).svg";
import snowflake10 from "../assets/snowflakes/snowflake-svgrepo-com (10).svg";
import snowflake11 from "../assets/snowflakes/snowflake-svgrepo-com (11).svg";
import snowflake12 from "../assets/snowflakes/snowflake-svgrepo-com (12).svg";

class Flake {
  x: number;
  y: number;
  speed: number;
  size: number;
  image: HTMLImageElement;
  constructor(x: number, y: number, speed: number, size: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;

    this.image = document.querySelectorAll(".snowflake")[
      Math.floor(Math.random() * 13)
    ] as HTMLImageElement;
  }

  update = () => {
    this.y += this.speed;
    if (this.y >= window.innerHeight) this.y = 0;
  };

  draw = (ctx: CanvasRenderingContext2D) => {
    // draw snowflake
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
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
  const maxFlakes = Math.round(window.innerWidth / 30);

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

      <div className="hidden">
        <img src={snowflake} alt="" className="snowflake" />
        <img src={snowflake1} alt="" className="snowflake" />
        <img src={snowflake2} alt="" className="snowflake" />
        <img src={snowflake3} alt="" className="snowflake" />
        <img src={snowflake4} alt="" className="snowflake" />
        <img src={snowflake5} alt="" className="snowflake" />
        <img src={snowflake6} alt="" className="snowflake" />
        <img src={snowflake7} alt="" className="snowflake" />
        <img src={snowflake8} alt="" className="snowflake" />
        <img src={snowflake9} alt="" className="snowflake" />
        <img src={snowflake10} alt="" className="snowflake" />
        <img src={snowflake11} alt="" className="snowflake" />
        <img src={snowflake12} alt="" className="snowflake" />
      </div>
    </>
  );
};
