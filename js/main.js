'use strict';
let money = 1000;
let income = "фриланс";
let addExpenses = "Интернет, Такси, Коммуналка";
let deposit = true;
let mission = 20000;
let period = 10;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");
console.log(addExpenses.toLowerCase().split(", "));
console.log("Дневной бюджет: " + budgetDay);

try {
    money = Number(prompt('Ваш месячный доход?'));
  
    if (Number.isNaN(money)) {
        throw new Error('Неверно введен доход');
      }

    addExpenses = (prompt('Перечислите возможные расходы за рассчитываемый период через запятую')).split(', ');
    deposit = !!confirm('Есть ли у вас депозит в банке?');
    console.log('Месячный доход: ' + money);
    console.log('Возможные расходы: ' + addExpenses);
    console.log('Депозит в банке: ' + (deposit ? 'да' : 'нет'));

    let expenses = new Array(2);
    let amount = new Array(2);
    let budgetMonth = money;
    for(let i = 0; i < 2; i++) {
      expenses[i] = (prompt('Введите обязательную статью расходов ' + (i+1)));
      amount[i] = (Number(prompt('Во сколько это обойдется?')));
           
      if (!Number.isNaN(amount[i])) {
        console.log(expenses[i] + ': ' + amount[i]);
        budgetMonth -= amount[i];
      }
      else {
        throw new Error('Неверно введены расходы');
      }

    }

    console.log('Месячный бюджет: ' + budgetMonth);
    if (budgetMonth <= 0) {
      console.log('При текущем уровне дохода цель не будет достигнута никогда');
    } else {
      console.log('Цель будет достигнута за ' + Math.ceil(money / budgetMonth) + ' месяцев');
    }
    budgetDay = budgetMonth / 30;
    console.log('Бюджет на день: ' + budgetDay);

    if (budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
      console.log('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
} catch (e) {
  console.log(e.message + ' Попробуйте еще раз');  
}