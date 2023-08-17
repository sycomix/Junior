import { postCommit } from '../service/postCommit';
import postRequirements from '../service/postRequirements';
import { commitMessage } from '../model/commitMessage';
import { fetchGitStatus } from '../service/fetchGitStatus';
import clearState from '../service/clearState';

const CommitButton = () => {
  const handleCommit = async () => {
    const response = await postCommit(commitMessage());
    console.log(response.message);
    
    await postRequirements('');
    
    const status = await fetchGitStatus();
    console.log(status);
    clearState();
  };

  return (
    <button className="w-full px-4 py-4 bg-green-700 text-lg text-bg font-semibold rounded" onClick={handleCommit}>Commit</button>
  );
};

export default CommitButton;
