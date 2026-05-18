const display = document.querySelector('#display');
const buttons = document.querySelector('.buttons');

const safeEval = (expression) => {
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    throw new Error('Invalid expression');
  }

  const value = Function(`"use strict"; return (${expression})`)();
  if (!Number.isFinite(value)) {
    throw new Error('Math error');
  }
  return value;
};

const setDisplay = (value) => {
  display.value = value;
};

buttons.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === 'clear') {
    setDisplay('0');
    return;
  }

  if (action === 'backspace') {
    const trimmed = display.value.slice(0, -1);
    setDisplay(trimmed || '0');
    return;
  }

  if (action === 'equals') {
    try {
      const result = safeEval(display.value);
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
    return;
  }

  if (display.value === '0' || display.value === 'Error') {
    setDisplay(value);
    return;
  }

  setDisplay(display.value + value);
});
