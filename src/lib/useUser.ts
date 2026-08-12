"use client";
import { useState, useEffect } from "react";

export interface RidecUser {
  role: string;
  email: string;
  name: string;
}

export function useUser(): RidecUser | null {
  const [user, setUser] = useState<RidecUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ridec-user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return user;
}
