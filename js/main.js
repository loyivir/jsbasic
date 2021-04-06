'use strict';
let money = 1000;
let income = "фриланс";
let addExpenses = "Интернет, Такси, Коммуналка";
let deposit = true;
let mission = 20000;
let period = 10;
let budgetDay = money / 30;

function getExpensesMonth(expenses) {
  let sum = 0; 
  for(let i = 0; i < expenses.length; i++) {
    sum += expenses[i];
   }
   return sum;
}

function getAccumulatedMonth(money, expenses) {
  return money-expenses;
}

function getTargetMonth(money, accumulatedMonth) {
   if (accumulatedMonth <= 0) {
      return -1;
    } else {
      return Math.ceil(mission / accumulatedMonth);
    }   
}

function showTypeOf(value) {
  console.log(typeof value);
}

function getStatusIncome(budget) {
  if (budget >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (budget >= 600) {
      return 'У вас средний уровень дохода';
    } else if (budget >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
}
  showTypeOf(money);
  showTypeOf(income);
  showTypeOf(deposit);
try {

    money = Number(prompt('Ваш месячный доход?'));
  
    if (Number.isNaN(money)) {
        throw new Error('Неверно введен доход');
      }

    addExpenses = (prompt('Перечислите возможные расходы за рассчитываемый период через запятую')).split(', ');
    deposit = !!confirm('Есть ли у вас депозит в банке?');
   
    console.log('Возможные расходы: ' + addExpenses);
   
    let expenses = new Array(2);
    let amount = new Array(2);
   
    for(let i = 0; i < 2; i++) {
      expenses[i] = (prompt('Введите обязательную статью расходов ' + (i+1)));
      amount[i] = (Number(prompt('Во сколько это обойдется?')));           
      if (Number.isNaN(amount[i])) {       
        throw new Error('Неверно введены расходы');
      }
    }
    console.log('Расходы за месяц: ' + getExpensesMonth(amount));

    let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount));

    if (accumulatedMonth <= 0) {
      console.log('При текущем уровне дохода цель не будет достигнута никогда');
    } else {
      console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
    }
    budgetDay = accumulatedMonth / 30;
    console.log('Бюджет на день: ' + budgetDay.toFixed(2));

    console.log(getStatusIncome(budgetDay));
    
} catch (e) {
  console.log(e.message + ' Попробуйте еще раз');  
}