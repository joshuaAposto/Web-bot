const axios = require("axios");

module.exports = {
  Bilat: {
    name: "sim",
    version: "1.0.0",
  },
  async execute(args) {
    if (args.length === 0) {
      return "Please enter a prompt.";
    }

    const prompt = args.join(" ");
    const url = `https://sim.up.railway.app/nash?prompt=${encodeURIComponent(prompt)}&apiKey=nsh-883e7484a2b1635796654b59e9192b62`;

    try {
      const response = await axios.get(url);
      return `${response.data.response}`;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return "Failed to fetch data. Please try again later.";
    }
  },
};
