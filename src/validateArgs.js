const { errorsMessage } = require("./errors");

module.exports.checkConfigArg = (args) => {
  // Проверка на отсутствие -c или --config
  if (args.indexOf("-c") < 0 && args.indexOf("--config") < 0) {
    errorsMessage(
      "Missing command line flag -c or --config. Please enter this flag1"
    );
  }
  // Проверка на дубликат -c
  if (args.indexOf("-c") !== args.lastIndexOf("-c")) {
    errorsMessage("-c flag is duplicated");
  }
  // Проверка на дубликат --config
  if (args.indexOf("--config") !== args.lastIndexOf("--config")) {
    errorsMessage("--config flag is duplicated");
  }
  // Проверка на правильность написания --config
  if (args.indexOf("-config") >= 0) {
    errorsMessage(
      "-config no such argument is provided. Did you mean --config"
    );
  }
};

module.exports.checkInputArg = (args) => {
  // Дубликат -i
  if (args.indexOf("-i") !== args.lastIndexOf("-i")) {
    errorsMessage("-i flag is duplicated");
  }
  // Дубликат --input
  if (args.indexOf("--input") !== args.lastIndexOf("--input")) {
    errorsMessage("--input flag is duplicated");
  }
};

module.exports.checkOutputArg = (args) => {
  // Дубликат -o
  if (args.indexOf("-o") !== args.lastIndexOf("-o")) {
    errorsMessage("-o flag is duplicated");
  }
  // Дубликат --output
  if (args.indexOf("--output") !== args.lastIndexOf("--output")) {
    errorsMessage("--output flag is duplicated");
  }
};

module.exports.checkConfigurate = (configurate) => {
  //  C1-C0-R0-R0-A
  // Проверка на валидность конфигурации
  const validArgs = ["C1", "C0", "A", "R0", "R1"];
  const args = configurate.split("-");
  for (let i = 0; i < args.length; i++) {
    if (!validArgs.includes(args[i])) {
      errorsMessage("Incorrect configuration. Allowable values: C0,C1,R0,R1,A");
    }
  }
};
