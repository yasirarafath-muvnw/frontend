"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function Home() {
  const { user, accessToken } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   console.log("accessToken from context:", accessToken);

  //   if (accessToken) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/auth/login");
  //   }
  // }, [accessToken]);

  // return null;
}
