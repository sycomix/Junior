import { createEffect } from 'solid-js';
import postDescriptor from '../service/postDescriptor';
import { promptDescriptor, setPromptDescriptor } from '../model/promptDescriptor'; 
import { requirements, setRequirements } from '../model/requirements';
import { getYamlEntry } from '../service/getYamlEntry';
import { isBetaEnabled } from '../service/cliArgsService'; 
import jsyaml from 'js-yaml'; 
import AutoGrowingTextarea from './AutoGrowingTextarea';

const RequirementsEditor = () => {
  const handleRequirementsChange = async (e) => {
    await postDescriptor({ requirements: e.target.value });
  };

  const handleInput = (e) => {
    const descriptor = promptDescriptor();
    const parsed = jsyaml.load(descriptor);
    parsed.requirements = e.target.value; 
    const updatedDescriptor = jsyaml.dump(parsed);
    setPromptDescriptor(updatedDescriptor);
  };

  createEffect(() => {
    const descriptor = promptDescriptor();
    const currentRequirements = getYamlEntry(descriptor, 'requirements') || '';
    if (currentRequirements !== requirements()) {
      setRequirements(currentRequirements);
    }
  });

  const isBeta = isBetaEnabled();

  return (
    <div class="w-full flex justify-start bg-emphasize text-emphasize p-1 rounded border border-border mt-2">
      <AutoGrowingTextarea
        class="w-full bg-emphasize text-emphasize text-lg"
        placeholder={isBeta ? "Enter your requirements..." : "This is disabled for now. Call with 'npx junior-web -- --beta' to enable."}
        value={requirements()}
        onInput={e => handleInput(e)}
        onChange={e => handleRequirementsChange(e)}
        disabled={!isBeta}
      />
    </div>
  );
};

export default RequirementsEditor;