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
//money = start();

let appData = {
income: {},
addIncome: [],
expenses: {},
addExpenses:[],
deposit: false,
percentDeposit: 0,
moneyDeposit: 0,
mission: 50000,
period: 3,
budget: money,
budgetMonth: 0,
expensesMonth: 0,
budgetDay: 0,
asking: function(){

  if (confirm('Есть ли у вас дополнительный заработок?')) {
    let itemIncome;
    let cashIncome;
    do {
      itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
    } while (isNumber(itemIncome));
    do {
      cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
    } while (!isNumber(cashIncome));
    appData.income[itemIncome] = cashIncome;
  }
  let addExpenses;
  do {
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while(isNumber(addExpenses));
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
  appData.budgetDay = Math.floor(appData.budgetMonth / 30).toFixed(2);
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
},
getInfoDeposit: function() {
   if (appData.deposit) {
     do {
       // не понятно: процент должен быть строкой или все-таки числом?
       appData.percentDeposit = prompt('Какойгодовой процент?', '10');
     } while (isNumber(appData.percentDeposit));
     do {
       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
     } while (!isNumber(appData.moneyDeposit));
  }
},
calcSavedMoney: function() {
  return appData.budgetMonth * appData.period;

}

};
/*
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

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

//Здесь допустимо изменять данные в appData.addExpenses? Этот кусок кода временный?
for (let key in appData.addExpenses) {
  
  appData.addExpenses[key] = appData.addExpenses[key].substring(0, 1).toUpperCase() +
   appData.addExpenses[key].substring(1); 
}
console.log(appData.addExpenses.join(', '));
*/
const calculateButton = document.getElementById('start');
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
const depositCheckmark = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const resultElements = document.getElementsByClassName('result')[0];
const valueElements = resultElements.querySelectorAll('[class*="-value"]');
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
const expensesAmount = document.querySelector('.expenses-amount');
const expensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
