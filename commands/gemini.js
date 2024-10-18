const axios = require("axios");

module.exports = {
  Bilat: {
    name: "gemini",
    version: "1.0.0",
  },
  async execute(args) {
    if (args.length === 0) {
      return "Please provide a prompt.";
    }

    const prompt = args.join(" ");
    const url = `${global.NashBot.JOSHUA}blackbox/model/gemini-pro?prompt=${encodeURIComponent(prompt)}`;

    try {
      const response = await axios.get(url);
      let cleanResponse = response.data.response.replace(/\$@\$v=undefined-rv1\$@\$/g, "");
      return cleanResponse;
    } catch (error) {
      return "An error occurred while fetching the Gemini Pro response.";
    }
  },
};
