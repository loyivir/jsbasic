"use strict";

const calculateButton = document.getElementById("start");
const resetButton = document.getElementById("cancel");
const incomeAddButton = document.getElementsByTagName("button")[0];
const expensesAddButton = document.getElementsByTagName("button")[1];
const depositCheckmark = document.querySelector("#deposit-check");
const additionalIncome = document.querySelectorAll(".additional_income-item");
const resultElements = document.getElementsByClassName("result")[0];
const valueElements = resultElements.querySelectorAll('[class*="-value"]');
let salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector(".income-title");
const additionalIncomeItem1 = document.querySelectorAll(".additional_income-item")[0];
const additionalIncomeItem2 = document.querySelectorAll(".additional_income-item")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
const expensesTitle = document.querySelector(".expenses-title");
const additionalExpensesItem = document.querySelector(".additional_expenses-item");
const targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let periodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll(".income-items");
if (salaryAmount.value === "") {
  calculateButton.disabled = true;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  incomeMonth: 0,
  budget: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budgetDay: 0,
  start: function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    resetButton.style.display = "block";
    calculateButton.style.display = "none";
    //appData.getInfoDeposit();
  },
  showResult: function () {
    valueElements[0].value = this.budgetMonth;
    valueElements[1].value = this.budgetDay;
    valueElements[2].value = this.expensesMonth;
    valueElements[3].value = this.addIncome.join(", ");
    valueElements[4].value = this.addExpenses.join(", ");
    valueElements[5].value = this.calcPeriod();
    valueElements[6].value = this.getTargetMonth();
    periodSelect.addEventListener("input", function () {
      valueElements[5].value = this.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesAddButton.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeAddButton.style.display = "none";
    }
  },
  changePeriod: function () {
    periodAmount.textContent = periodSelect.value;
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let expensesItem = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;

      if (expensesItem !== "" && cashExpenses !== "") {
        this.expenses[expensesItem] = cashExpenses;
      }
    }, this);
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let incomeItem = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (incomeItem !== "" && cashIncome !== "") {
        this.income[incomeItem] = cashIncome;
      }
    }, this);
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(", ");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncome.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },

  getBudget: function (myMoney, expenseSum) {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30).toFixed(2);
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (const key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return this.expensesMonth;
  },
  getIncomeMonth: function () {
    let sum = 0;
    for (const key in this.income) {
      sum += +this.income[key];
    }
    this.incomeMonth = sum;
    return this.incomeMonth;
  },
  getTargetMonth: function () {
    if (this.budgetMonth <= 0) {
      return "Цель не будет достигнута";
    } else {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
  },
  getStatusIncome: function () {
    if (this.budget >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budget >= 600) {
      return "У вас средний уровень дохода";
    } else if (this.budget >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  },
  getInfoDeposit: function () {
    this.deposit = confirm("Есть ли у вас депозит в банке?");
    if (this.deposit) {
      do {
        // не понятно: процент должен быть строкой или все-таки числом?
        this.percentDeposit = prompt("Какойгодовой процент?", "10");
      } while (isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  verifySalaryAmount: function () {
    salaryAmount = document.querySelector(".salary-amount");

    if (salaryAmount.value === "") {
      calculateButton.disabled = true;
    } else {
      calculateButton.disabled = false;
    }
  },
  reset: function () {
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(function (elem) {
      elem.value = "";
    });

    incomeItems = document.querySelectorAll(".income-items");
    for (let i = incomeItems.length - 1; i >= 1; i--) {
      incomeItems[i].remove();
    }
    incomeAddButton.style.display = "block";
    expensesItems = document.querySelectorAll(".expenses-items");
    for (let i = expensesItems.length - 1; i >= 1; i--) {
      expensesItems[i].remove();
    }
    expensesAddButton.style.display = "block";

    periodAmount.textContent = "1";
    periodSelect.value = "1";

    depositCheckmark.checked = false;

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
    resetButton.style.display = "none";
    calculateButton.style.display = "block";
    calculateButton.disabled = true;
  },
};

calculateButton.addEventListener("click", appData.start.bind(appData));
resetButton.addEventListener("click", appData.reset.bind(appData));
salaryAmount.addEventListener("input", appData.verifySalaryAmount);
expensesAddButton.addEventListener("click", appData.addExpensesBlock);
incomeAddButton.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.changePeriod);
