import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f5efe8",
        ink: "#332722",
        sand: "#ddc9b3",
        clay: "#9d7053",
        bronze: "#7b553c",
        mist: "#fffaf5",
      },
      boxShadow: {
        ambient: "0 24px 80px rgba(71, 48, 35, 0.16)",
        pulse: "0 0 0 8px rgba(245, 239, 232, 0.16)",
      },
      backgroundImage: {
        "showroom-grid":
          "radial-gradient(circle at top, rgba(157, 112, 83, 0.14), transparent 34%), linear-gradient(135deg, rgba(255, 250, 245, 0.9), rgba(221, 201, 179, 0.42))",
      },
    },
  },
  plugins: [],
};

export default config;
