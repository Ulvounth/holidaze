import Image from "next/image";
import SearchBar from "./SearchBar";

const Hero: React.FC = () => {
  return (
    <section className="relative h-[50vh]">
      <Image
        src="/images/hero.webp"
        alt="Hero Background"
        fill
        priority={true}
        quality={75}
        style={{ objectFit: "cover" }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
          Secure your dream vacation at an unbeatable price here!
        </h1>

        <div className="w-full max-w-2xl mx-auto">
          <SearchBar className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
