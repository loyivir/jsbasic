const validation = () => {
  const toNormalCase = (elem) => {
    const text = elem.value;
    elem.value = text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
  };
  const validateMessage = (elem) => {
    const text = elem.value;
    elem.value = text.replace(/[^- А-Яа-я\d,.?!:;]+/g, '');
  };
  const validateName = (elem) => {
    const text = elem.value;
    elem.value = text.replace(/[^ А-Яа-я]+/g, '');
  };
  const validateEmail = (elem) => {
    const text = elem.value;
    elem.value = text.replace(/[^-_.!~*'@A-Za-z0-9]+/g, ''); // /\w+@\w+\.\w{2,3}/g
  };
  const validatePhone = (elem) => {
    const text = elem.value;
    elem.value = text.replace(/[^+\d)(]+/g, ''); // /\+?[78]([-()]*\d){10}/g
  };
  const validateInputs = (input) => {
    let text = input.value;
    text = text.replace(/^[ -]+|[ -]+$/g, '');
    text = text.replace(/(-+)/g, '-');
    text = text.replace(/( +)/g, ' ');
    input.value = text;
  };
  document.body.addEventListener('input', (event) => {
    const target = event.target;
    if (target.tagName !== 'INPUT') {
      return;
    }

    if (target.classList.contains('calc-item') && !target.classList.contains('calc-type')) {
      const text = target.value;
      target.value = text.replace(/\D+/g, '');
    }
    if (
      target.getAttribute('id') === 'form1-name' ||
      target.getAttribute('id') === 'form2-name' ||
      target.getAttribute('id') === 'form3-name'
    ) {
      validateName(target);
    }
    if (target.getAttribute('id') === 'form2-message') {
      validateMessage(target);
    }
    if (target.classList.contains('form-email')) {
      validateEmail(target);
    }
    if (target.classList.contains('form-phone')) {
      validatePhone(target);
    }
  });
  document.body.addEventListener('focusout', (event) => {
    const target = event.target;
    if (target.tagName !== 'INPUT') {
      return;
    }
    validateInputs(target);
    if (
      target.getAttribute('id') === 'form1-name' ||
      target.getAttribute('id') === 'form2-name' ||
      target.getAttribute('id') === 'form3-name'
    ) {
      toNormalCase(target);
    }
  });
};

export default validation;
