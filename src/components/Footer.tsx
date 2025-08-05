import type { FC } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

interface FooterProps {
  theme: string;
}

const Footer: FC<FooterProps> = ({ theme }) => {
  return (
    <footer
      className={`w-full py-4 flex justify-center items-center gap-2
        ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
    >
      <p className="flex items-center gap-1 text-xs">
        Made with <HeartIcon className="w-3 h-3 text-red-500" /> by{" "}
        <a
          href="https://github.com/shwetakhatra"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition-colors"
        >
          Shweta Khatra
        </a>
      </p>
    </footer>
  );
};

export default Footer;
