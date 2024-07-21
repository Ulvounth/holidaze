const Hero: React.FC = () => {
    return (
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/images/hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl mb-4">Secure your dream vacation at an unbeatable price here!</h2>
          <div className="flex">
            <input type="text" placeholder="Search location" className="p-2 rounded-l" />
            <button className="p-2 bg-pink-500 rounded-r">Search</button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  