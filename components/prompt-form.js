import { useEffect, useState } from "react";

export default function PromptForm({
  initialPrompt,
  onSubmit,
  disabled = false,
}) {
  const [prompt, setPrompt] = useState(initialPrompt);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrompt("");
    onSubmit(e);
  };

  if (disabled) {
    return;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 animate-in fade-in duration-700">
      <label htmlFor="prompt-input" className="font-bold">
        What does Jean Luc Picard do next?
      </label>

      <div className="flex mt-2">
        <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className={`block w-full flex-grow${
            disabled ? " rounded-md" : " rounded-l-md"
          }`}
          disabled={disabled}
        />

        {disabled || (
          <button
            className="bg-black text-white rounded-r-md text-small inline-block p-3 flex-none"
            type="submit"
          >
            Continue story
          </button>
        )}
      </div>
    </form>
  );
}
