import React from 'react';

const Options = ({ options, handleSelection, description, prompt, scene }) => {
  const handleButtonClick = (e, value, text) => {
    e.preventDefault();
    const message = text;

    prompt = `${prompt}</context>
<desc>${description}</desc>
<decision${scene}>
<options>
<option1>${options[0].text}</option1>
<option2>${options[1].text}</option2>
</options>
<choice${scene}> ${value === options[0].value ? 'option1' : 'option2'} </choice0>
</decision${scene}>
</scene${scene}>
<scene${scene + 1}>
<context>You chose ${text}</context>`;

    handleSelection(prompt, message, scene + 1);
  };

  return (
    <div>
      <p className="font-bold mt-4">What will you do?</p>
      <div className="button-group">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={(e) => handleButtonClick(e, option.value, option.text)}
            className="button mr-2 mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
