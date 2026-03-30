import { createAuthClient } from "better-auth/react";
import type { Auth, BetterAuthClientOptions } from "better-auth/types";

export const authClient = createAuthClient<BetterAuthClientOptions>({
  baseURL: "http://localhost:3000/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp } = authClient;