'use strict';

function  isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getExpensesMonth(expenses) {
  let sum = 0;
  let amount;
  for(let i = 0; i < 2; i++) {
    expenses[i] = (prompt('Введите обязательную статью расходов ' + (i + 1)));
    do {
       amount = prompt('Во сколько это обойдется?');
    } while(!isNumber(amount));
    sum += Number(amount);
  }
  return sum;
}

function getAccumulatedMonth(myMoney, expenseSum) {
  return myMoney - expenseSum;
}

function getTargetMonth(myMission, accumMonth) {
   if (accumMonth <= 0) {
      return -1;
    } else {
      return Math.ceil(myMission / accumMonth);
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
function start() {
  let  yourMoney;
  do {
    yourMoney = prompt('Ваш месячный доход?');
  } while(!isNumber(yourMoney));
  return Number(yourMoney);
}

let money = 1000;
let income = "фриланс";
let addExpenses = "Интернет, Такси, Коммуналка";
let deposit = true;
let mission = 20000;
let period = 10;
let budgetDay = money / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = start();

addExpenses = (prompt('Перечислите возможные расходы за рассчитываемый период через запятую')).split(', ');
deposit = !!confirm('Есть ли у вас депозит в банке?');
   
console.log('Возможные расходы: ' + addExpenses);
   
let expenses = new Array(2);

let expensesAmount = getExpensesMonth(expenses);
console.log('Расходы за месяц: ' + expensesAmount);

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

if (accumulatedMonth <= 0) {
  console.log('При текущем уровне дохода цель не будет достигнута никогда');
} else {
  console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
}
budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ' + budgetDay.toFixed(2));

console.log(getStatusIncome(budgetDay));
