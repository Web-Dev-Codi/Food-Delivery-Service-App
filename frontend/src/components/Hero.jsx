export default function HeroSection() {
  return (
    <section className="flex items-center justify-between p-10 bg-[rgb(25,25,112)] min-h-screen">
      {/* Left Side */}
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-[#ffbb28]">
          Bringing flavours to your doorstep!
        </h1>
        <p className="mt-10 text-[#f0db69]">
          At Four Flavors Express, we bring the world of flavors straight to
          your doorstep fresh, fast, and full of taste. Whether you’re craving
          comfort food, exotic cuisine, or a quick bite, we deliver with speed
          and care. Your favorite meals, just a tap away!
        </p>
      </div>

      {/* Right Side */}
      <div>
        <img
          src="src/assets/images/food delivary image.avif"
          alt="Delicious food"
          className="w-[800px] rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
