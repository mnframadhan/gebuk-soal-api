"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = startScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const database_1 = require("./database");
let scheduledTask = null;
// Function to start the cron job
function startScheduler() {
    if (!scheduledTask) {
        scheduledTask = node_cron_1.default.schedule('45 18 * * *', () => __awaiter(this, void 0, void 0, function* () {
            const currentTime = (0, moment_timezone_1.default)().tz('Asia/Jakarta').format();
            console.log(`Running scheduled task at: ${currentTime}`);
            console.log('Limit telah diupdate');
            // Your task logic here
            yield database_1.prismaClient.student.updateMany({
                where: {
                    membership: "Basic",
                },
                data: {
                    quota: 5,
                }
            });
        }), {
            scheduled: true,
            timezone: 'Asia/Jakarta',
        });
        console.log('Scheduler started!');
        console.log('Limit dari setiap student tanpa membership akan di reset ke 5 soal per hari pada pukul 18:45 WIB');
    }
    else {
        console.log('Scheduler is already running.');
    }
}
