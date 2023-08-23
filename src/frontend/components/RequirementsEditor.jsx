import { createEffect } from 'solid-js';
import postDescriptor from '../service/postDescriptor';
import { promptDescriptor } from '../model/promptDescriptor';
import { requirements, setRequirements } from '../model/requirements';

const RequirementsEditor = () => {
  const handleRequirementsChange = async (e) => {
    setRequirements(e.target.value);
    await postDescriptor({ requirements: e.target.value });
  };

  createEffect(() => {
    const currentRequirements = promptDescriptor().requirements || '';
    if (currentRequirements !== requirements()) {
      setRequirements(currentRequirements);
    }
  });

  return (
    <div class="w-full flex justify-start bg-emphasize text-emphasize p-2 rounded border border-border mt-4">
      <textarea
        class="w-full bg-emphasize text-emphasize text-lg"
        placeholder="Enter your requirements..."
        value={requirements()}
        onInput={e => handleRequirementsChange(e)}
      />
    </div>
  );
};

export default RequirementsEditor;
