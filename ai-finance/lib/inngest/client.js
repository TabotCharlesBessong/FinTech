import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "wealth_ai", // Unique app ID
  name: "Wealth AI",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});
