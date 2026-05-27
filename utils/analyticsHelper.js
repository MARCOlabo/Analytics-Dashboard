export const isToday = (dateValue) => {

  const today = new Date();
  const date = new Date(dateValue);

  return date.toDateString() === today.toDateString();

};

export const isWithinWeek = (dateValue) => {
  const date = new Date(dateValue);
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  return date >= lastWeek;

};