const Atbash = require("./atbash");
const Ceasar = require("./ceasar");
const Rot = require("./rot");
const { errorsMessage } = require("./errors");
module.exports.tranformProcess = (stream, config) => {
  let arrConfig = config.split("-");
  for (i = 0; i < arrConfig.length; i++) {
    switch (arrConfig[i]) {
      case "A":
        stream = stream.pipe(new Atbash()).setEncoding("utf8");
        break;
      case "C0":
        stream = stream
          .pipe(new Ceasar({ decoding: true }))
          .setEncoding("utf8");
        break;
      case "C1":
        stream = stream
          .pipe(new Ceasar({ decoding: false }))
          .setEncoding("utf8");
        break;
      case "R0":
        stream = stream.pipe(new Rot({ decoding: true })).setEncoding("utf8");
        break;
      case "R1":
        stream = stream.pipe(new Rot({ decoding: false })).setEncoding("utf8");
        break;
      default:
        errorsMessage("Invalid configuration");
    }
  }
  return stream;
};
