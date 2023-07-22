let registeredEarly = false;
let runnerAge = 11;
let raceNumber = Math.floor(Math.random() * 1000);

if (runnerAge >= 33 && registeredEarly) {
  raceNumber += 1200;
  console.log(`You will race at 9:30 am. Your race number is ${raceNumber}.`);
} else if (runnerAge === 18) {
  console.log("Please see the registration desk.");
} else if (runnerAge >= 18 && !registeredEarly) {
  console.log(`You will race at 11:00 am. Your race number is ${raceNumber}.`);
} else {
  console.log(`Youth registrants will race at 12:30 pm. Your race number is ${raceNumber}.`);
}
