"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/authContext";
import { UserProvider } from "@/context/userContext";
import { Toaster } from 'sonner';
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3b82f6",
    },
    background: {
      default: "#f9fafb",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function Providers({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>{children}</UserProvider>
          </AuthProvider>
        </QueryClientProvider>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </>
  );
}
