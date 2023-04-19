import React from 'react';

const Characters = ({ universe, handleSelection }) => {
  let character1;
  let character2;

  switch (universe) {
    case 'TOS':
      character1 = 'Captain Kirk';
      character2 = 'Mr. Spock';
      break;
    case 'TNG':
      character1 = 'Captain Jean Luc Picard';
      character2 = 'Commander William Riker';
      break;
    case 'DS9':
      character1 = 'Captain Benjamin Sisko';
      character2 = 'Commander Jadzia Dax';
      break;
    case 'VOY':
      character1 = 'Captain Kathryn Janeway';
      character2 = 'Commander Chakotay';
      break;
    case 'ENT':
      character1 = 'Captain Jonathan Archer';
      character2 = 'Commander Charles Tucker III';
      break;
    case 'DIS':
      character1 = 'Captain Michael Burnham';
      character2 = 'Commander Saru';
      break;
    case 'PIC':
      character1 = 'Captain Jean Luc Picard';
      character2 = 'Commander Raffi Musiker';
      break;
    default:
      character1 = 'Captain Kirk';
      character2 = 'Mr. Spock';
  }

  const handleButtonClick = (e, character) => {
    e.preventDefault();
    const message = `You chose to be ${character}`;

    const prompt = `<universe>${universe}</universe>
<start>
<decision0>
<options>
<option1>You are ${character1}</option1>
<option2>You are ${character2}</option2>
</options>
<choice0> ${character1 === character ? 'option1' : 'option2'} </choice0>
</decision0>
</start>
<scene1>
<context>You have chosen to be ${character}`;

    handleSelection(prompt, message, 1);
  };

  return (
    <div>
      <p className="font-bold mb-2">Which character will you be?</p>
      <div className="button-group">
        <button
          key={character1}
          onClick={(e) => handleButtonClick(e, character1)}
          className="button mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {character1}
        </button>
        <button
          key={character2}
          onClick={(e) => handleButtonClick(e, character2)}
          className="button ml-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {character2}
        </button>
      </div>
    </div>
  );
};

export default Characters;
