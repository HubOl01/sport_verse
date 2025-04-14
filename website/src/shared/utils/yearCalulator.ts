export function calculateYearsWithEnd(
  startSportDate: Date | string,
  endSportDate?: Date | string // Дата окончания спортивной карьеры (необязательная)
): string {
  // Преобразование входных данных в объекты Date
  const startDate =
    typeof startSportDate === "string"
      ? new Date(startSportDate)
      : startSportDate;
  const endDate =
    typeof endSportDate === "string"
      ? new Date(endSportDate)
      : endSportDate ?? new Date();

  // Годы начала и окончания
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  // Разница в годах
  let yearsDifference = endYear - startYear;

  // Проверяем, прошел ли день рождения в году окончания
  if (
    endDate.getMonth() < startDate.getMonth() || // Месяц ещё не наступил
    (endDate.getMonth() === startDate.getMonth() &&
      endDate.getDate() < startDate.getDate()) // День ещё не наступил
  ) {
    yearsDifference--; // Вычитаем 1 год, если день рождения ещё не наступил
  }

  // Функция для определения правильного окончания слова "год/года/лет"
  const getYearSuffix = (years: number): string => {
    if (years % 10 === 1 && years % 100 !== 11) {
      return "год"; // Например, 1 год, 21 год
    } else if (
      [2, 3, 4].includes(years % 10) &&
      ![12, 13, 14].includes(years % 100)
    ) {
      return "года"; // Например, 2 года, 3 года, 23 года
    } else {
      return "лет"; // Например, 5 лет, 11 лет, 100 лет
    }
  };

  // Возвращаем результат в виде строки
  return `${yearsDifference} ${getYearSuffix(yearsDifference)}`;
}
