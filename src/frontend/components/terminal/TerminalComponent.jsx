import { onCleanup, onMount } from 'solid-js';
import 'xterm/css/xterm.css';
import terminalConnection from '../../service/terminal/terminalConnection';
import { setupXTerm } from '../../service/terminal/setupXTerm';
import { sendTerminalResizeNotification } from '../../service/terminal/sendTerminalResizeNotification';
import DetailsComponent from '../DetailsComponent';
import VirtualButton from './VirtualButton';
import terminalVirtualKeyBindings from '../../config/terminalVirtualKeyBindings';

const TerminalComponent = () => {
  let container;
  const { term, fitAddon } = setupXTerm();

  const sendVirtualKey = (key) => {
    terminalConnection.sendDataToTerminal(JSON.stringify({ type: 'input', data: key }));
    term.focus();
  };

  onMount(() => {
    term.open(container);
    fitAddon.fit();

    const { rows, cols } = term;
    sendTerminalResizeNotification(rows, cols);

    terminalConnection.setOnDataReceived((data) => {
      term.write(data);
    });

    term.onData((data) => {
      terminalConnection.sendDataToTerminal(JSON.stringify({ type: 'input', data }));
    });

    term.onResize(({ newRows, newCols }) => {
      sendTerminalResizeNotification(newRows, newCols);
    });
  });
  
  onCleanup(() => {
    term.dispose();
    terminalConnection.closeConnection();
  });

  return (
    <DetailsComponent 
      defaultState="closed"
      localStorageKey="terminalState"
      generateHeader={() => "Terminal"}
      classes="rounded border p-2 w-full border-border bg-emphasize"
    >
      <div class="flex overflow-x-auto whitespace-nowrap">
        {terminalVirtualKeyBindings().map(({ label, action }) => (
          <VirtualButton label={label} action={() => sendVirtualKey(action)} />
        ))}
      </div>
      <div ref={container}>
        {/* The terminal will be rendered inside this div */}
      </div>
    </DetailsComponent>
  );
};

export default TerminalComponent;
