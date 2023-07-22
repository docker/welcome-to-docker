const name = 'Nala';

const getRandEvent = () => {
  const random = Math.floor(Math.random() * 3);
  let event;
  let days;

  if (random === 0) {
    event = 'Marathon';
    days = 50;
  } else if (random === 1) {
    event = 'Triathlon';
    days = 100;
  } else {
    event = 'Pentathlon';
    days = 200;
  }

  return { event, days };
};

const logEvent = (name, event) => {
  console.log(`${name}'s event is: ${event}`);
};

const logTime = (name, days) => {
  console.log(`${name}'s time to train is: ${days} days`);
};

const random = 1; // Set random to 1 for Triathlon event
const { event, days } = getRandEvent();

logEvent(name, event);
logTime(name, days);

const { event: event2, days: days2 } = getRandEvent();
const name2 = 'Warren';

logEvent(name2, event2);
logTime(name2, days2);


