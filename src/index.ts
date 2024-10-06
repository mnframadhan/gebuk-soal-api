import { app } from "./application/web";
import { premiumScheduler, startScheduler } from "./application/scheduler";


// Start the scheduler, limit akan di reset ke 5 setiap pukul 6.00
startScheduler();
premiumScheduler();

app.listen(3000, () => {
    console.log("Listening on port 3000")
})


