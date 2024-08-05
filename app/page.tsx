import Link from "next/link";
import Hero from "./components/ui/Hero";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Link href="/profile">Profile page</Link>
    </>
  );
};

export default Home;
