import { gradientBg } from "../../assets";

export const GradientBgTl = () => {
  return (
    <div className="absolute inset-20 -translate-x-15%] -translate-y-[10%] w-[65vw] h-[65vw] opacity-70 mix-blend-color-dodge pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-[75rem] h-[15rem] -translate-x-1/2 -translate-y-1/2">
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
