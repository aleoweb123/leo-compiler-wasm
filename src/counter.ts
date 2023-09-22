export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    const event = new CustomEvent('custom-event', {
      detail: {
        value: 'child web component'
      }
    });
    dispatchEvent(event);
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
