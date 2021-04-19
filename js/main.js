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
const periodSelect = document.querySelector(".period-select");
const periodAmount = document.querySelector(".period-amount");
let incomeItems = document.querySelectorAll(".income-items");
if (salaryAmount.value === "") {
  calculateButton.disabled = true;
}

class AppData {
  constructor() {
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
  }
  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  start() {
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
  }
  showResult() {
    const _this = this;
    valueElements[0].value = this.budgetMonth;
    valueElements[1].value = this.budgetDay;
    valueElements[2].value = this.expensesMonth;
    valueElements[3].value = this.addIncome.join(", ");
    valueElements[4].value = this.addExpenses.join(", ");
    valueElements[5].value = this.calcPeriod();
    valueElements[6].value = this.getTargetMonth();
    periodSelect.addEventListener("input", function () {
      valueElements[5].value = _this.calcPeriod();
    });
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesAddButton.style.display = "none";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeAddButton.style.display = "none";
    }
  }
  changePeriod() {
    periodAmount.textContent = periodSelect.value;
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const expensesItem = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;

      if (expensesItem !== "" && cashExpenses !== "") {
        this.expenses[expensesItem] = cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      const incomeItem = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (incomeItem !== "" && cashIncome !== "") {
        this.income[incomeItem] = cashIncome;
      }
    });
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(", ");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30).toFixed(2);
  }
  getExpensesMonth() {
    let sum = 0;
    for (const key in this.expenses) {
      sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return this.expensesMonth;
  }
  getIncomeMonth() {
    let sum = 0;
    for (const key in this.income) {
      sum += +this.income[key];
    }
    this.incomeMonth = sum;
    return this.incomeMonth;
  }
  getTargetMonth() {
    if (this.budgetMonth <= 0) {
      return "Цель не будет достигнута";
    } else {
      return Math.ceil(targetAmount.value / this.budgetMonth);
    }
  }
  getStatusIncome() {
    if (this.budget >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budget >= 600) {
      return "У вас средний уровень дохода";
    } else if (this.budget >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  }
  getInfoDeposit() {
    this.deposit = confirm("Есть ли у вас депозит в банке?");
    if (this.deposit) {
      do {
        // не понятно: процент должен быть строкой или все-таки числом?
        this.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (AppData.isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!AppData.isNumber(this.moneyDeposit));
    }
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  verifySalaryAmount() {
    salaryAmount = document.querySelector(".salary-amount");

    if (salaryAmount.value === "") {
      calculateButton.disabled = true;
    } else {
      calculateButton.disabled = false;
    }
  }
  reset() {
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach((elem) => {
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
  }
  addEventListeners() {
    calculateButton.addEventListener("click", this.start.bind(this));
    resetButton.addEventListener("click", this.reset.bind(this));
    salaryAmount.addEventListener("input", this.verifySalaryAmount.bind(this));
    expensesAddButton.addEventListener("click", this.addExpensesBlock.bind(this));
    incomeAddButton.addEventListener("click", this.addIncomeBlock.bind(this));
    periodSelect.addEventListener("input", this.changePeriod.bind(this));
  }
}

const appData = new AppData();
console.log(appData);
appData.addEventListeners();
