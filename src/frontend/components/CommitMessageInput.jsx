import { commitMessage, setCommitMessage } from '../stores/commitMessage';

const CommitMessageInput = (props) => {
  const handleChange = (e) => {
    setCommitMessage(e.target.value);
  };

  return (
    <input type="text" class="w-64 px-4 py-2 border rounded" placeholder="Commit message..." onInput={handleChange} />
  );
};

export default CommitMessageInput;
