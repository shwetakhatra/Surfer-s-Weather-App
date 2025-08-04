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
      <p className="flex items-center gap-1">
        Made with <HeartIcon className="w-5 h-5 text-red-500" /> by Shweta
        Khatra
      </p>
    </footer>
  );
};

export default Footer;
