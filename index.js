const fs = require("fs");
const { errorsMessage } = require("./src/errors");
const streams = require("./src/streams");
const validate = require("./src/validateArgs");

let INPUT, OUTPUT;

const args = process.argv.slice(2);
validate.checkConfigArg(args);

const configurate = process.argv[3];
validate.checkConfigurate(configurate);

// Проверка на отсутствие input file
if (args.indexOf("-i") >= 0) {
  INPUT = args[args.indexOf("-i") + 1];
}

if (args.indexOf("--input") >= 0) {
  INPUT = args[args.indexOf("--input") + 1];
}

if (INPUT) {
  if (!fs.existsSync(INPUT)) {
    errorsMessage("input file is missing");
  }
}

// Проверка на отсутствие output file
if (args.indexOf("-o") >= 0) {
  OUTPUT = args[args.indexOf("-o") + 1];
}
if (args.indexOf("--output") >= 0) {
  OUTPUT = args[args.indexOf("--output") + 1];
}
if (OUTPUT) {
  if (!fs.existsSync(OUTPUT)) {
    errorsMessage("output file is missing");
  }
}

if (INPUT && OUTPUT) {
  const readStream = streams.tranformProcess(
    fs.createReadStream(INPUT, "utf-8"),
    configurate
  );
  readStream.pipe(fs.createWriteStream(OUTPUT, { flags: "a" }));
} else if (INPUT && !OUTPUT) {
  const readStream = streams.tranformProcess(
    fs.createReadStream(INPUT, "utf-8"),
    configurate
  );
  readStream.pipe(process.stdout);
} else if (!INPUT && OUTPUT) {
  const readStream = streams.tranformProcess(
    process.stdin.setEncoding("utf8"),
    configurate
  );
  readStream.pipe(fs.createWriteStream(OUTPUT, { flags: "a" }));
} else {
  const readStream = streams.tranformProcess(
    process.stdin.setEncoding("utf8"),
    configurate
  );
  readStream.pipe(process.stdout);
}
