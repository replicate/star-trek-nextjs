import React from 'react';

const Universes = ({ handleSelection }) => {
  const handleButtonClick = (e, value, name) => {
    e.preventDefault();
    const message = `You chose Star Trek: ${name}`;
    handleSelection(value, message);
  };

  const starTrekUniverses = [
    {
      name: 'The Original Series',
      value: 'TOS',
    },
    {
      name: 'The Next Generation',
      value: 'TNG',
    },
    {
      name: 'Deep Space Nine',
      value: 'DS9',
    },
    {
      name: 'Voyager',
      value: 'VOY',
    },
    {
      name: 'Enterprise',
      value: 'ENT',
    },
    {
      name: 'Discovery',
      value: 'DIS',
    },
    {
      name: 'Picard',
      value: 'PIC',
    },
  ]

  return (
    <div>
      <p className="font-bold mb-2">Pick a Star Trek universe</p>
      <div className="button-group">
        {starTrekUniverses.map((universe) => (
          <button
            key={universe.value}
            onClick={(e) => handleButtonClick(e, universe.value, universe.name)}
            className="button mr-2 mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {universe.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Universes;
