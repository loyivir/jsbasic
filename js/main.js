"use strict";

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
  }
  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  start() {
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
  }
  showResult() {
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
  }
  addExpensesBlock() {
    const cloneExpensesItem = this.expensesItems[0].cloneNode(true);
    this.expensesItems[0].parentNode.insertBefore(cloneExpensesItem, this.expensesAddButton);
    this.expensesItems = document.querySelectorAll(".expenses-items");
    if (this.expensesItems.length === 3) {
      this.expensesAddButton.style.display = "none";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = this.incomeItems[0].cloneNode(true);
    this.incomeItems[0].parentNode.insertBefore(cloneIncomeItem, this.incomeAddButton);
    this.incomeItems = document.querySelectorAll(".income-items");
    if (this.incomeItems.length === 3) {
      this.incomeAddButton.style.display = "none";
    }
  }
  changePeriod() {
    this.periodAmount.textContent = this.periodSelect.value;
  }
  getExpenses() {
    this.expensesItems.forEach((item) => {
      const expensesItem = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;

      if (expensesItem !== "" && cashExpenses !== "") {
        this.expenses[expensesItem] = cashExpenses;
      }
    });
  }
  getIncome() {
    this.incomeItems.forEach((item) => {
      const incomeItem = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (incomeItem !== "" && cashIncome !== "") {
        this.income[incomeItem] = cashIncome;
      }
    });
  }
  getAddExpenses() {
    let addExpenses = this.additionalExpensesItem.value.split(", ");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    this.additionalIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  getBudget(myMoney, expenseSum) {
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
      return Math.ceil(this.targetAmount.value / this.budgetMonth);
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
    return this.budgetMonth * this.periodSelect.value;
  }
  verifySalaryAmount() {
    this.salaryAmount = document.querySelector(".salary-amount");

    if (this.salaryAmount.value === "") {
      this.calculateButton.disabled = true;
    } else {
      this.calculateButton.disabled = false;
    }
  }
  reset() {
    let inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach((elem) => {
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
  }
  addEventListeners() {
    this.calculateButton.addEventListener("click", this.start.bind(this));
    this.resetButton.addEventListener("click", this.reset.bind(this));
    this.salaryAmount.addEventListener("input", this.verifySalaryAmount.bind(this));
    this.expensesAddButton.addEventListener("click", this.addExpensesBlock.bind(this));
    this.incomeAddButton.addEventListener("click", this.addIncomeBlock.bind(this));
    this.periodSelect.addEventListener("input", this.changePeriod.bind(this));
  }
}

const appData = new AppData();
console.log(appData);
appData.addEventListeners();
