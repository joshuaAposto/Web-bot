const fs = require("fs");
const path = require("path");

module.exports = {
  Bilat: {
    name: "help",
    version: "1.0.0",
  },
  async execute() {
    const commandsDir = path.join(__dirname);
    const files = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js") && file !== "help.js");
    
    const commandsList = files.map(file => {
      const command = require(path.join(commandsDir, file));
      return `❍ ${command.Bilat.name || file.replace(".js", "")}`;
    }).join("\n");
    
    return commandsList;
  },
};
