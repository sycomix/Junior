import { createSignal } from 'solid-js';
import ListItem from '../MultiSelect/ListItem';

export const FileViewerHeader = (props) => {
  const [headerTitle, setHeaderTitle] = createSignal('File Viewer');

  return (
    <div class="flex justify-between items-center p-4 bg-emphasize">
      <h1 class="text-xl font-bold">{headerTitle()}</h1>
      <ListItem item={props.path} />
      <button
        class="text-3xl font-bold text-emphasize"
        onClick={props.onClose}
      >
        &times;
      </button>
    </div>
  );
};
