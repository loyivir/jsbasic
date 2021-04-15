'use strict';

const calculateButton = document.getElementById('start');
const incomeAddButton = document.getElementsByTagName('button')[0];
const expensesAddButton = document.getElementsByTagName('button')[1];
const depositCheckmark = document.querySelector('#deposit-check');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const resultElements = document.getElementsByClassName('result')[0];
const valueElements = resultElements.querySelectorAll('[class*="-value"]');
let salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
let expensesItems = document.querySelectorAll('.expenses-items');
const expensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');
if (salaryAmount.value === '') {
    calculateButton.disabled = true;
  }
 
function  isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
income: {},
addIncome: [],
expenses: {},
addExpenses:[],
deposit: false,
percentDeposit: 0,
moneyDeposit: 0,
incomeMonth: 0, 
budget: 0,
budgetMonth: 0,
expensesMonth: 0,
budgetDay: 0,
start: function() {
  appData.budget = +salaryAmount.value;
  appData.getExpenses(); 
  appData.getExpensesMonth();
  appData.getAddExpenses();
  appData.getAddIncome();
  appData.getIncome();
  appData.getBudget();
  appData.showResult();

//appData.getInfoDeposit();
},
showResult: function() {
  valueElements[0].value = appData.budgetMonth;
  valueElements[1].value = appData.budgetDay;
  valueElements[2].value = appData.expensesMonth;
  valueElements[3].value = appData.addIncome.join(', ');
  valueElements[4].value = appData.addExpenses.join(', ');
  valueElements[5].value = appData.calcPeriod();
  valueElements[6].value = appData.getTargetMonth();
  periodSelect.addEventListener('input', function (){
     valueElements[5].value = appData.calcPeriod();
  });
},
addExpensesBlock: function() {
 
 let cloneExpensesItem = expensesItems[0].cloneNode(true);
 expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
 expensesItems = document.querySelectorAll('.expenses-items');
 if (expensesItems.length === 3) {
   expensesAddButton.style.display = 'none';
 }
},
addIncomeBlock: function() {
 let cloneIncomeItem = incomeItems[0].cloneNode(true);
 incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
 incomeItems = document.querySelectorAll('.income-items');
 if (incomeItems.length === 3) {
   incomeAddButton.style.display = 'none';
 }
},
changePeriod: function () {
periodAmount.textContent = periodSelect.value;
},
getExpenses: function() {
  expensesItems.forEach(function(item) {
   let expensesItem = item.querySelector('.expenses-title').value;
   let cashExpenses = item.querySelector('.expenses-amount').value;
  if (expensesItem !== '' && cashExpenses !== '') {
     appData.expenses[expensesItem] = cashExpenses;
  }
  });
},
getIncome: function() {
incomeItems.forEach(function(item) {
   let incomeItem = item.querySelector('.income-title').value;
   let cashIncome = item.querySelector('.income-amount').value;
  if (incomeItem !== '' && cashIncome !== '') {
     appData.income[incomeItem] = cashIncome;
  }
  });
  
},
getAddExpenses: function() {
  let addExpenses =  additionalExpensesItem.value.split(', ');
   addExpenses.forEach(function(item){
    item = item.trim(); 
    if(item !== '') {
       appData.addExpenses.push(item);
     }
   });
},
getAddIncome: function() {
  additionalIncome.forEach(function(item) {
let itemValue = item.value.trim();
if(itemValue !== ''){
  appData.addIncome.push(itemValue);
}
  });
},

getBudget: function(myMoney, expenseSum) {
  appData.budgetMonth = appData.budget + appData.incomeMonth - appData.getExpensesMonth();
  appData.budgetDay = Math.floor(appData.budgetMonth / 30).toFixed(2);
},
getExpensesMonth: function() {
   let sum = 0;
   for(const key in appData.expenses) {  
    sum += +appData.expenses[key];
  } 
   appData.expensesMonth = sum;
   return appData.expensesMonth;
},
getTargetMonth: function() {
   if (appData.budgetMonth <= 0) {
      return "Цель не будет достигнута";
    } else {
      return Math.ceil(targetAmount.value / appData.budgetMonth);
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
  appData.deposit = confirm('Есть ли у вас депозит в банке?');
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
calcPeriod: function() {
  return appData.budgetMonth * periodSelect.value;

},
verifySalaryAmount: function () {
  salaryAmount = document.querySelector('.salary-amount');

  if (salaryAmount.value === '') {
    calculateButton.disabled = true;
  } else {
    calculateButton.disabled = false;
  }
} 
};

/*

if (appData.budgetMonth <= 0) {
  console.log('При текущем уровне дохода цель не будет достигнута никогда');
} else {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
}



console.log('Наша программа включает в себя данные:');
for(let key in appData) {
  console.log(key + ':' + appData[key]);
}


*/


calculateButton.addEventListener('click', appData.start);
salaryAmount.addEventListener('input', appData.verifySalaryAmount);
expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);
