"use client";

import LoginForm from "@/components/auth/LoginForm";
import { Box, Typography, Container } from "@mui/material";

export default function Page() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff 0%, #dbeafe 100%)",
        p: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight={700}
            color="primary.main"
            sx={{ mb: 1 }}
          >
            Welcome to Pomni
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            Elevate your productivity — smart task & project management made effortless.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
            p: 5,
            bgcolor: "background.paper",
            backdropFilter: "blur(8px)",
          }}
        >
          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
}
