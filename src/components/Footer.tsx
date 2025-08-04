import type { FC } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

const Footer: FC = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 flex justify-center items-center gap-2">
      <span>Made with</span>
      <HeartIcon className="w-5 h-5 text-red-500" />
      <span>by Shweta Khatra</span>
    </footer>
  );
};

export default Footer;
