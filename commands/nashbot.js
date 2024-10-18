const axios = require("axios");

module.exports = {
  Bilat: {
    name: "nashbot",
    version: "1.0.0",
  },
  async execute(args) {
    if (args.length === 0) {
      return "Please provide a prompt.";
    }

    const prompt = args.join(" ");
    const url = `${global.NashBot.JOSHUA}nashbot?q=${encodeURIComponent(prompt)}`;

    try {
      const response = await axios.get(url);
      return response.data.response;
    } catch (error) {
      return "An error occurred while fetching the Nashbot response.";
    }
  },
};
