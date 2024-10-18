const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

global.NashBoT = {
  commands: new Map(),
};

global.NashBot = {
  JOSHUA: "https://rest-api.joshuaapostol.site/"
};

const loadModules = (type) => {
  const folderPath = path.join(__dirname, type);
  const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));
  files.forEach((file) => {
    const module = require(path.join(folderPath, file));
    if (module && module.Bilat && module.execute) {
      global.NashBoT.commands.set(module.Bilat.name.toLowerCase(), module);
    }
  });
};

loadModules("commands");

app.post("/chat", (req, res) => {
  const { message } = req.body;

  let [command, ...args] = message.trim().split(" ");
  const cmdFile = global.NashBoT.commands.get(command.toLowerCase());

  if (cmdFile) {
    cmdFile.execute(args)
      .then(reply => res.json({ reply }))
      .catch(err => res.json({ reply: `The command "${command}" not recognized. Type "help" to see more commands.` }));
  } else {
    res.json({ reply: `The command "${command}" not recognized. Type "help" to see more commands.` });
  }
});

app.post("/api/admin/add-command", (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ message: "Command name and code are required." });
  }

  const commandPath = path.join(__dirname, "commands", `${name.toLowerCase()}.js`);
  
  fs.writeFile(commandPath, code, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving command." });
    }
    
    loadModules("commands");
    res.json({ message: `Command "${name}" added successfully!` });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));