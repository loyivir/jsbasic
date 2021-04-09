'use strict';
let money = 1000;

function  isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {
  let  yourMoney;
  do {
    yourMoney = prompt('Ваш месячный доход?');
  } while(!isNumber(yourMoney));
  return Number(yourMoney);
}
money = start();

let appData = {
income: {},
addIncome: [],
expenses: {},
addExpenses:[],
deposit: false,
mission: 50000,
period: 3,
budget: money,
budgetMonth: 0,
expensesMonth: 0,
budgetDay: 0,
asking: function(){
  let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
  appData.addExpenses = addExpenses.toLowerCase().split(', ');
  appData.deposit = confirm('Есть ли у вас депозит в банке?');

  let amount;
  for(let i = 0; i < 2; i++) {
    let expenses = (prompt('Введите обязательную статью расходов ' + (i + 1)));  
    do {
       amount = prompt('Во сколько это обойдется?');
    } while(!isNumber(amount));
  
    appData.expenses[expenses] = Number(amount);
  } 
  console.log(appData.expenses);
},
getBudget: function(myMoney, expenseSum) {
  appData.budgetMonth = appData.budget - appData.getExpensesMonth();
  appData.budgetDay = (appData.budgetMonth / 30).toFixed(2);
},
getExpensesMonth: function() {
   let sum = 0;
   for(const key in appData.expenses) {  
    sum += appData.expenses[key];
  } 
   appData.expensesMonth = sum;
   return appData.expensesMonth;
},
getTargetMonth: function() {
   if (appData.budgetMonth <= 0) {
      return -1;
    } else {
      return Math.ceil(appData.mission / appData.budgetMonth);
    }   
},
getStatusIncome: function() {
  if (appData.budget >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budget >= 600) {
      return 'У вас средний уровень дохода';
    } else if (appData.budget >= 0) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что то пошло не так';
    }
}
};

appData.asking();
console.log('Расходы за месяц: ' +  appData.getExpensesMonth());

appData.getBudget();

if (appData.budgetMonth <= 0) {
  console.log('При текущем уровне дохода цель не будет достигнута никогда');
} else {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for(let key in appData) {
  console.log(key + ':' + appData[key]);
}