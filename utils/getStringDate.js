const getStringDate = ({ year, month, day }) => {
  const date = new Date(year, month, day);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

export default getStringDate;
