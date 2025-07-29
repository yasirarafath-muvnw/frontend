"use client";

import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import pokemon from "@/asset/images/pokemon.png";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      
      {/* Left: Full Height Image - 1/3 */}
      <div className="w-1/3 h-screen hidden md:block relative">
        <Image
          src={pokemon}
          alt="Pokemon"
          fill
          className="object-cover"
        />
      </div>

      {/* Right: Login Section - 2/3 */}
      <div className="w-full md:w-2/3 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl hover:shadow-blue-300 transition duration-300 ease-in-out p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-blue-700">Welcome to Pomni</h1>
            <p className="text-gray-600 mt-2">
              Elevate your productivity — smart task & project management made effortless.
            </p>
          </div>

          <LoginForm />

          <p className="text-gray-600 mt-2">
              Do not have account, Please SignUp
            </p>
        </div>
      </div>
    </div>
  );
}
