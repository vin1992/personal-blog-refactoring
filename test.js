const Emitter = require("events");

class MyEmitter extends Emitter {}

const a = new MyEmitter();

a.on("shit", () => {
  console.log("shit head");
});

a.emit("shit");
