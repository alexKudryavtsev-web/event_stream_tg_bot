export function convertDateToString(day, month) {
  const date = new Date();

  date.setDate(day);
  date.setMonth(month-1);

  return date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
}
