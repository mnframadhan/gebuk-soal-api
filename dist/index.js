"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
const scheduler_1 = require("./application/scheduler");
// Start the scheduler, limit akan di reset ke 5 setiap pukul 6.00
(0, scheduler_1.startScheduler)();
(0, scheduler_1.premiumScheduler)();
web_1.app.listen(3000, () => {
    console.log("Listening on port 3000");
});
