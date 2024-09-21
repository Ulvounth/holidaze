import SearchBar from "./SearchBar";

const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url(/images/hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
          Secure your dream vacation at an unbeatable price here!
        </h2>

        <div className="w-full max-w-lg mx-auto">
          <SearchBar className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
