"use client";

import Image from "next/image";
import pokemon from "@/asset/images/pokemon.png";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden md:block md:w-1/2 relative">
                <Image
                    src={pokemon}
                    alt="Auth visual"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

