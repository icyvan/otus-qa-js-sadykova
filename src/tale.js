function kolobok(name) {
  switch (name) {
    case 'дедушка':
      return 'Я от дедушки ушёл';
    case 'заяц':
      return 'Я от зайца ушёл';
    case 'лиса':
      return 'Меня съели';
    default:
      return 'Привет! Я колобок';
  }
}

function newYear(name) {
  return `${name}! ${name}! ${name}!`;
}
