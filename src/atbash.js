const { Transform } = require("stream");
const { atbashKeys } = require("./utils/AthbashKeys");

module.exports = class Atbash extends Transform {
  constructor(options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    });
    super(options);
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
          let isUpperCase = i === i.toUpperCase();
          let transformItem = atbashKeys[i.toLowerCase()] ?? i;
          return isUpperCase ? transformItem.toUpperCase() : transformItem;
        })
        .join("")
    );
    callback();
  }
};
