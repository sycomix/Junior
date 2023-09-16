import { onMount, createEffect } from 'solid-js';
import getBackgroundColorForFile from './getBackgroundColorForFile';
import { gitStatus } from '../model/gitStatus';
import { fetchGitStatus } from '../service/fetchGitStatus';

const GitStatusDisplay = () => {
  let statusContainer;

  onMount(fetchGitStatus);

  createEffect(() => {
    const gitStatusValue = gitStatus();
    if (gitStatusValue) {
      if (gitStatusValue.error) {
        statusContainer.innerText = `${gitStatusValue.message}\n${gitStatusValue.error.stderr}`;
      } else if (gitStatusValue.data && gitStatusValue.data.files && gitStatusValue.data.files.length > 0) {
        statusContainer.innerHTML = gitStatusValue.data.files.map(entry => {
          const { index, path, working_dir } = entry;
          const bgColor = getBackgroundColorForFile(index, path);
          return `<div class="grid grid-cols-3 ${bgColor ? 'bg-' + bgColor : ''}">
                    <span class="col-span-1 w-50px">${index}</span>
                    <span class="col-span-1 w-60%">${path}</span>
                    <span class="col-span-1">${working_dir}</span>
                  </div>`;
        }).join('');
      }
    }
  });

  return (
    <pre
      ref={statusContainer}
      class={`rounded overflow-auto max-w-full ${gitStatus() && gitStatus().data && gitStatus().data.files && gitStatus().data.files.length > 0 ? 'block' : 'hidden'}`}
    />
  );
};

export default GitStatusDisplay;
