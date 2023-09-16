import getBackgroundColorForFile from './getBackgroundColorForFile';

const GitStatusRow = (props) => {
  const { index, path, working_dir } = props.entry;
  const bgColor = getBackgroundColorForFile(index, path);
  return (
    <div class={`flex ${bgColor ? 'bg-' + bgColor : ''}`}>
      <span class="w-50px">{index}</span>
      <span class="flex-grow w-60%">{path}</span>
      <span class="flex-shrink">{working_dir}</span>
    </div>
  );
};

export default GitStatusRow;
