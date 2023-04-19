import React from 'react';

const Universes = ({ onButtonClick }) => {
  const handleButtonClick = (value) => {
    onButtonClick(value);
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
    <div className="button-group flex flex-wrap justify-center">
      {starTrekUniverses.map((universe) => (
        <button
          key={universe.value}
          onClick={() => handleButtonClick(universe.value)}
          className="button m-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {universe.name}
        </button>
      ))}
    </div>
  );
};

export default Universes;
