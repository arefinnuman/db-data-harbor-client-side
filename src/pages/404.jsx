import Image from "next/image";
import Link from "next/link";
import { AiOutlineExclamationCircle, AiOutlineHome } from "react-icons/ai";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  animate-fadeSlideUp">
      <div className="bg-white p-8  text-center max-w-xl mx-auto">
        <div className="flex justify-center items-center">
          <AiOutlineExclamationCircle className="text-red-500 text-7xl mb-4" />
        </div>

        <h1 className="text-3xl font-bold mt-2 mb-4 animate-fadeSlideUp delay-100">
          Oops! 404
        </h1>

        <Image
          src="https://i.ibb.co/4RgmNFB/IMG-5668.jpg"
          alt="Eastern Bank Logo"
          layout="responsive"
          width={400}
          height={400}
          className="shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg mt-4 mb-6"
        />

        <p className="text-lg mb-6 font-medium animate-fadeSlideUp delay-200">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="flex items-center  justify-center space-x-2 px-5 py-3 bg-blue-500
          text-white rounded-lg font-semibold transition-all transform
          hover:bg-blue-600 hover:shadow-lg hover:scale-105 focus:outline-none
          focus:ring-2 focus:ring-blue-200"
        >
          <AiOutlineHome className="text-xl" />
          <span>Go to Home</span>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s ease-in-out forwards;
        }

        .animate-fadeSlideUp.delay-100 {
          animation-delay: 0.1s;
        }

        .animate-fadeSlideUp.delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
