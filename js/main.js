"use strict";

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.incomeMonth = 0;
  this.budget = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.budgetDay = 0;
  //DOM
  this.calculateButton = document.getElementById("start");
  this.resetButton = document.getElementById("cancel");
  this.incomeAddButton = document.getElementsByTagName("button")[0];
  this.expensesAddButton = document.getElementsByTagName("button")[1];
  this.depositCheckmark = document.querySelector("#deposit-check");
  this.additionalIncome = document.querySelectorAll(".additional_income-item");
  this.resultElements = document.getElementsByClassName("result")[0];
  this.valueElements = this.resultElements.querySelectorAll('[class*="-value"]');
  this.salaryAmount = document.querySelector(".salary-amount");
  this.incomeTitle = document.querySelector(".income-title");
  this.additionalIncomeItem1 = document.querySelectorAll(".additional_income-item")[0];
  this.additionalIncomeItem2 = document.querySelectorAll(".additional_income-item")[1];
  this.expensesItems = document.querySelectorAll(".expenses-items");
  this.expensesTitle = document.querySelector(".expenses-title");
  this.additionalExpensesItem = document.querySelector(".additional_expenses-item");
  this.targetAmount = document.querySelector(".target-amount");
  this.periodSelect = document.querySelector(".period-select");
  this.periodAmount = document.querySelector(".period-amount");
  this.incomeItems = document.querySelectorAll(".income-items");
  if (this.salaryAmount.value === "") {
    this.calculateButton.disabled = true;
  }
};
AppData.prototype.isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
AppData.prototype.start = function () {
  this.budget = +this.salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.resetButton.style.display = "block";
  this.calculateButton.style.display = "none";
  //appData.getInfoDeposit();
};
AppData.prototype.showResult = function () {
  const _this = this;
  this.valueElements[0].value = this.budgetMonth;
  this.valueElements[1].value = this.budgetDay;
  this.valueElements[2].value = this.expensesMonth;
  this.valueElements[3].value = this.addIncome.join(", ");
  this.valueElements[4].value = this.addExpenses.join(", ");
  this.valueElements[5].value = this.calcPeriod();
  this.valueElements[6].value = this.getTargetMonth();
  this.periodSelect.addEventListener("input", function () {
    _this.valueElements[5].value = _this.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = this.expensesItems[0].cloneNode(true);
  this.expensesItems[0].parentNode.insertBefore(cloneExpensesItem, this.expensesAddButton);
  this.expensesItems = document.querySelectorAll(".expenses-items");
  if (this.expensesItems.length === 3) {
    this.expensesAddButton.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = this.incomeItems[0].cloneNode(true);
  this.incomeItems[0].parentNode.insertBefore(cloneIncomeItem, this.incomeAddButton);
  this.incomeItems = document.querySelectorAll(".income-items");
  if (this.incomeItems.length === 3) {
    this.incomeAddButton.style.display = "none";
  }
};
AppData.prototype.changePeriod = function () {
  this.periodAmount.textContent = this.periodSelect.value;
};
AppData.prototype.getExpenses = function () {
  this.expensesItems.forEach(function (item) {
    let expensesItem = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;

    if (expensesItem !== "" && cashExpenses !== "") {
      this.expenses[expensesItem] = cashExpenses;
    }
  }, this);
};
AppData.prototype.getIncome = function () {
  this.incomeItems.forEach(function (item) {
    let incomeItem = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (incomeItem !== "" && cashIncome !== "") {
      this.income[incomeItem] = cashIncome;
    }
  }, this);
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = this.additionalExpensesItem.value.split(", ");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      this.addExpenses.push(item);
    }
  }, this);
};
AppData.prototype.getAddIncome = function () {
  this.additionalIncome.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      this.addIncome.push(itemValue);
    }
  }, this);
};

AppData.prototype.getBudget = function (myMoney, expenseSum) {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30).toFixed(2);
};
AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (const key in this.expenses) {
    sum += +this.expenses[key];
  }
  this.expensesMonth = sum;
  return this.expensesMonth;
};
AppData.prototype.getIncomeMonth = function () {
  let sum = 0;
  for (const key in this.income) {
    sum += +this.income[key];
  }
  this.incomeMonth = sum;
  return this.incomeMonth;
};
AppData.prototype.getTargetMonth = function () {
  if (this.budgetMonth <= 0) {
    return "Цель не будет достигнута";
  } else {
    return Math.ceil(this.targetAmount.value / this.budgetMonth);
  }
};
AppData.prototype.getStatusIncome = function () {
  if (this.budget >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (this.budget >= 600) {
    return "У вас средний уровень дохода";
  } else if (this.budget >= 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else {
    return "Что то пошло не так";
  }
};
AppData.prototype.getInfoDeposit = function () {
  this.deposit = confirm("Есть ли у вас депозит в банке?");
  if (this.deposit) {
    do {
      // не понятно: процент должен быть строкой или все-таки числом?
      this.percentDeposit = prompt("Какойгодовой процент?", "10");
    } while (AppData.isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
    } while (!AppData.isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * this.periodSelect.value;
};
AppData.prototype.verifySalaryAmount = function () {
  this.salaryAmount = document.querySelector(".salary-amount");

  if (this.salaryAmount.value === "") {
    this.calculateButton.disabled = true;
  } else {
    this.calculateButton.disabled = false;
  }
};
AppData.prototype.reset = function () {
  let inputs = document.querySelectorAll("input[type=text]");
  inputs.forEach(function (elem) {
    elem.value = "";
  });

  this.incomeItems = document.querySelectorAll(".income-items");
  for (let i = this.incomeItems.length - 1; i >= 1; i--) {
    this.incomeItems[i].remove();
  }
  this.incomeAddButton.style.display = "block";
  this.expensesItems = document.querySelectorAll(".expenses-items");
  for (let i = this.expensesItems.length - 1; i >= 1; i--) {
    this.expensesItems[i].remove();
  }
  this.expensesAddButton.style.display = "block";

  this.periodAmount.textContent = "1";
  this.periodSelect.value = "1";
  this.depositCheckmark.checked = false;

  this.budget = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.incomeMonth = 0;
  this.budget = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.budgetDay = 0;
  this.resetButton.style.display = "none";
  this.calculateButton.style.display = "block";
  this.calculateButton.disabled = true;
};
AppData.prototype.addEventListeners = function () {
  this.calculateButton.addEventListener("click", this.start.bind(this));
  this.resetButton.addEventListener("click", this.reset.bind(this));
  this.salaryAmount.addEventListener("input", this.verifySalaryAmount.bind(this));
  this.expensesAddButton.addEventListener("click", this.addExpensesBlock.bind(this));
  this.incomeAddButton.addEventListener("click", this.addIncomeBlock.bind(this));
  this.periodSelect.addEventListener("input", this.changePeriod.bind(this));
};
const appData = new AppData();
console.log(appData);
appData.addEventListeners();
/*

*/
