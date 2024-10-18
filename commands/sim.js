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
    const url = `https://sim.up.railway.app/nash?prompt=${encodeURIComponent(prompt)}&apiKey=nsh-82f0bfcb102a623e5b415b51538b723c`;

    try {
      const response = await axios.get(url);
      return `${response.data.response}`;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return "Failed to fetch data. Please try again later.";
    }
  },
};
