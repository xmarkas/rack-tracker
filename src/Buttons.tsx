import { ValueOrUndefined } from 'tinybase';
import { useAddRowCallback, useSetValueCallback } from 'tinybase/ui-react';

// Convenience function for generating a random integer
const getRandom = (max = 100) => Math.floor(Math.random() * max);

export const Buttons = ({getByHall = () => {} }) => {
  // Attach events to the buttons to mutate the data in the TinyBase Store

  return (
    <div id='buttons'>
      <button onClick={getByHall}>Add Rack</button>
    </div>
  );
};


// const handleRandom = useSetValueCallback('random', () => getRandom());
//   const handleAddPet = useAddRowCallback('pets', (_, store) => ({
//     name: ['fido', 'felix', 'bubbles', 'lowly', 'polly'][getRandom(5)],
//     species: store.getRowIds('species')[getRandom(5)],
//   }));