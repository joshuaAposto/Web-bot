const axios = require("axios");

module.exports = {
  Bilat: {
    name: "teach",
    version: "1.0.0",
  },
  async execute(args) {
    const input = args.join(" ");
    const [question, answer] = input.split("|").map(item => item.trim());

    if (!question || !answer) {
      return "Please provide a question and answer in the format: question | answer";
    }

    const url = `https://sim.up.railway.app/teach`;

    try {
      const response = await axios.get(url, {
        params: {
          question: question,
          answer: answer,
        },
      });
      return `${response.data.message}`;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return "Failed to submit data. Please try again later.";
    }
  },
};
