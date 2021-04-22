window.addEventListener('DOMContentLoaded', () => {
  function sayHello() {
    const date = new Date();

    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayTime =
        date.getHours() < 11 && date.getHours() >= 4
          ? 'Доброе утро'
          : date.getHours() >= 11 && date.getHours() < 17
          ? 'Добрый день'
          : date.getHours() >= 17 && date.getHours() < 21
          ? 'Добрый вечер'
          : 'Доброй ночи',
      weekDay = weekDays[date.getDay()],
      time = date.toLocaleTimeString('en-US'),
      newYear = Math.floor(
        (new Date(date.getFullYear(), 11, 31, 23, 59, 0).getTime() - date.getTime()) / 1000 / 60 / 60 / 24
      );
    document.body.style.fontStyle = 'italic';
    document.body.style.fontSize = '18px';
    document.body.innerHTML = `${dayTime} <br>
                             Сегодня: ${weekDay} <br>
                             Текущее время: ${time}<br>
                             До нового года осталось ${newYear} ${
      newYear % 10 === 1 && newYear !== 11 && newYear !== 111
        ? 'день'
        : newYear % 10 > 1 && newYear % 10 < 5 && (newYear % 100 < 11 || newYear % 100 > 14)
        ? 'дня'
        : 'дней'
    }`;
  }
  setInterval(sayHello, 1000);
});
