//Calculator
const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcTotalValue = document.getElementById('total'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count');

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = +calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
      total = total.toFixed(2);
    }

    calcTotalValue.textContent = total;
  };
  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('select')) {
      if (target.selectedIndex === 0) {
        calcSquare.value = '';
        calcDay.value = '';
        calcCount.value = '';
      }
      countSum();
    }
    if (target.matches('input')) {
      countSum();
    }
  });
};

export default calculator;
