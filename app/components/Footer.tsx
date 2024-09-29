import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-semibold">
          <h1>Holidaze</h1>
        </div>

        <div className="text-center text-sm mt-2 md:mt-0">
          <p>&copy; 2024 Andreas Ulvund</p>
        </div>

        <div className="flex space-x-6 mt-2 md:mt-0">
          <a
            href="https://github.com/Ulvounth"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-white hover:text-gray-400" size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/andreas-ulvund-98066376/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-white hover:text-gray-400" size={24} />
          </a>
          <a
            href="https://www.facebook.com/andywolfdog"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white hover:text-gray-400" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
