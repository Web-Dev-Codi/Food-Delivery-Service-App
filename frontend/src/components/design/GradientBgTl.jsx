import { gradientBg } from "../../assets";

export const GradientBgTl = () => {
  return (
    <div className="absolute inset-0 sm:inset-10 md:inset-20 -translate-x-[10%] -translate-y-[5%] w-[90vw] h-[90vw] sm:w-[75vw] sm:h-[75vw] md:w-[65vw] md:h-[65vw] opacity-70 mix-blend-color-dodge pointer-events-none">
      <div className="absolute top-1/3 left-1/2 w-[60vw] sm:w-[50vw] md:w-[75rem] h-[15rem] -translate-x-1/2 -translate-y-1/2">
        <img
          className="w-full"
          src={gradientBg}
          width={800}
          height={800}
          alt="Gradient Background"
        />
      </div>
    </div>
  );
};
