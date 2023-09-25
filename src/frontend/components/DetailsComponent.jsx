import { createSignal, onCleanup, onMount } from 'solid-js';

const DetailsComponent = (props) => {
  const [isOpen, setIsOpen] = createSignal(props.defaultState === 'open');

  // On mount, check local storage and set state accordingly
  onMount(() => {
    const savedState = localStorage.getItem("Junior.terminal.isOpen");
    if (savedState) {
      setIsOpen(savedState === 'true');
    }
  });

  // Update local storage whenever isOpen changes
  const updateLocalStorage = () => {
    // Capture the open state from the details tag before saving
    const currentState = event.currentTarget.open;
    setIsOpen(currentState);
    localStorage.setItem("Junior.terminal.isOpen", currentState ? 'true' : 'false');
  };

  const classes = props.classes || "";

  return (
    <details class={classes} open={isOpen()} onToggle={updateLocalStorage}>
      <summary>{props.generateHeader()}</summary>
      {props.children}
    </details>
  );
};

export default DetailsComponent;
