const { Transform } = require("stream");
const { encode } = require("./utils/CeasarKeys");
const { decode } = require("./utils/CeasarKeys");

module.exports = class Ceasar extends Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    });
    super(options);
    this.decoding = options.decoding;
  }
  _transform(chunk, encoding, callback) {
    if (encoding !== "utf8") {
      this.emit("error", new Error("Source must be UTF-8."));
      return callback();
    }
    this.push(
      chunk
        .split("")
        .map((i) => {
          if (this.decoding) {
            return encode[i] ?? i;
          } else {
            return decode[i] ?? i;
          }
        })
        .join("")
    );
    callback();
  }
};
