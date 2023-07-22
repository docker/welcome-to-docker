function getDayOfWeek(dayNumber) {
    let dayOfWeek = '';
    switch (dayNumber) {
      case 0:
        dayOfWeek = 'Sunday';
        break;
      case 1:
        dayOfWeek = 'Monday';
        break;
      case 2:
        dayOfWeek = 'Tuesday';
        break;
      case 3:
        dayOfWeek = 'Wednesday';
        break;
      case 4:
        dayOfWeek = 'Thursday';
        break;
      case 5:
        dayOfWeek = 'Friday';
        break;
      case 6:
        dayOfWeek = 'Saturday';
        break;
      default:
        dayOfWeek = 'Invalid day';
    }
    return dayOfWeek;
  }
  
  const dayNumber = 3;
  const dayOfWeek = getDayOfWeek(dayNumber);
  console.log("Day of the week:", dayOfWeek);