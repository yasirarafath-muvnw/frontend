"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";

import pic from '../../asset/images/pic.jpg'
import Menue from "@/components/Menue";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { user, accessToken, loading, login, logout } = useAuth();

    useEffect(() => {
        if (user) {
            console.log("user", user);
            console.log("user", user.email);
            console.log("user", user.id);
            console.log("user", user.name);
        }
    }, []);

    const handleLogoutConfirmed = () => {
        console.log("Logging out...");
        logout();
    };

    return (
        <>
            <div className="h-screen flex">
                <div className="flex w-[14%] md:w-[8%] bg-yellow-50  lg:w-[16%] xl:w-[14%] flex-col">
                    <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 p-2">
                        <Image src={pic}  alt="" className="h-10 w-10 contain-content">

                        </Image>
                        <span className="text-black hidden lg:block">Zono Cliq</span>
                    </Link>


                    <Menue handleLogoutConfirmed={handleLogoutConfirmed}/>
                </div>
                <div className="flex w-[86%]  md:w-[92%] lg:w-[84%] xl:w-[86%] bg-white overflow-scroll flex-col">
                    <Navbar />
                    {children}
                </div>
            </div>
        </>
    );
}


//  <div className="min-h-screen bg-gray-100 hidden md:flex">
//         <Sidebar
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)} // ✅ Just closes the sidebar
//           onLogout={() => setShowLogoutModal(true)} // ✅ Triggers logout confirmation
//         />

//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
//             <h1 className="text-xl font-semibold text-black">Dashboard</h1>
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-lg px-4 py-2 bg-gray-800 text-white rounded"
//             >
//               {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
//             </button>
//           </header>

//           {/* Content */}
//           <main className="p-6">{children}</main>
//         </div>
//       </div>
//       {showLogoutModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Confirm Logout
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Are you sure you want to logout?
//             </p>

//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   setShowLogoutModal(false);
//                   handleLogoutConfirmed();
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}