"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { user, accessToken, loading, login, logout, } = useAuth();

    useEffect(() => {
        if (user) {
            console.log('user', user);
            console.log('user', user.email);
            console.log('user', user.id);
            console.log('user', user.name);
        }
    }, [])



    // const onLogout = () => {
    //     console.log("Logging out...");
    //     logout();
    // };

    return (
        <>
            <div className="min-h-screen flex bg-gray-100">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setShowLogoutModal(true)}
                    onLogout={onLogout}
                />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
                        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-lg px-4 py-2 bg-gray-800 text-white rounded"
                        >
                            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                        </button>
                    </header>

                    {/* Content */}
                    <main className="p-6">{children}</main>
                </div>
            </div>
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
                        <p className="text-gray-600 mt-2">Are you sure you want to logout?</p>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowLogoutModal(false);
                                    onLogout();
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
