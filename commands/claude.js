const axios = require("axios");

module.exports = {
  Bilat: {
    name: "claude",
    version: "1.0.0",
  },
  async execute(args) {
    if (args.length === 0) {
      return "Please provide a prompt.";
    }

    const prompt = args.join(" ");
    const url = `${global.NashBot.JOSHUA}blackbox/model/claude-sonnet-3.5?prompt=${encodeURIComponent(prompt)}`;

    try {
      const response = await axios.get(url);
      const cleanResponse = response.data.response.replace(/\$@\$v=undefined-rv1\$@\$/g, "");
      return cleanResponse;
    } catch (error) {
      return "An error occurred while fetching the Claude response.";
    }
  },
};
