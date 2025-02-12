import { gradientBg } from "../../assets";

export const GradientBgTr = () => {
  return (
    <div className="absolute inset-0 translate-x-[55%] -translate-y-[10%] w-[65vw] h-[65vw] opacity-70 mix-blend-color-dodge pointer-events-none">
      <div className="absolute -bottom-1/3 right-1/4 w-[75rem] h-[60rem] translate-x-1/2 -translate-y-1/2">
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
