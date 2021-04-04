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