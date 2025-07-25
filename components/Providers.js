"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/authContext";
import { UserProvider } from "@/context/userContext";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
