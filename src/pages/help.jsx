// import React, { useState } from 'react';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [generatedPrompt, setGeneratedPrompt] = useState('');
//   // const [filters, setFilters] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({
//     selectFilter: '',
//     numberFilter: 0,
//   });


//   const handlePromptChange = (e) => {
//     const newText = e.target.value;
//     setPrompt(newText);
//     updateGeneratedPrompt(newText, selectedFilters);
//   };

//   const handleSelectFilterChange = (e) => {
//     const filterValue = e.target.value;
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       selectFilter: filterValue,
//     }));
//     updateGeneratedPrompt(prompt, { ...selectedFilters, selectFilter: filterValue });
//   };

//   const handleNumberFilterChange = (e) => {
//     const filterValue = parseInt(e.target.value, 10);
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       numberFilter: filterValue,
//     }));
//     updateGeneratedPrompt(prompt, { ...selectedFilters, numberFilter: filterValue });
//   };

//   const updateGeneratedPrompt = (text, filters) => {
//     // Implement the logic to generate a prompt based on the provided text and filters.
//     // For this example, we'll concatenate the text and selected filters.
//     const generated = `${text} ${filters.selectFilter} ${filters.numberFilter}`;
//     setGeneratedPrompt(generated);
//   };

//   const addFilter = () => {
//     // Implement logic to add filters to the `filters` state.
//   };

//   const generatePrompt = () => {
//     // Implement logic to generate a prompt based on the user's input and selected filters.
//   };

//   // const generatePromptBasedOnFilters = (text, appliedFilters) => {
//   //   // Implement the logic to generate a prompt based on the provided text and filters.
//   //   // You can use the text and appliedFilters to generate the prompt.
//   //   // For this example, we'll simply concatenate the text and selected filters.
//   //   return `${text} ${appliedFilters.join(' ')}`;
//   // };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-4xl font-bold mb-4 text-center">Midjourney Prompt Helper</h1>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
//           Enter your prompt:
//         </label>
//         <textarea
//           id="prompt"
//           placeholder="Start typing your idea..."
//           className="w-full p-2 border rounded"
//           value={prompt}
//           onChange={handlePromptChange}
//         />
//       </div>
//       {/* Filters */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectFilter">
//           Version:
//         </label>
//         <select
//           id="selectFilter"
//           className="w-full p-2 border rounded"
//           value={selectedFilters.selectFilter}
//           onChange={handleSelectFilterChange}
//         >
//           <option value="">---</option>
//           <option value="--version1">1</option>
//           <option value="--version2">2</option>
//           {/* Add more filter options here */}
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberFilter">
//           Chaos (0-100):
//         </label>
//         <input
//           type="number"
//           id="numberFilter"
//           className="w-full p-2 border rounded"
//           value={selectedFilters.numberFilter}
//           onChange={handleNumberFilterChange}
//           min="0"
//           max="100"
//         />
//       </div>
//       {/* EndFilters */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Generated Prompt:</label>
//         <div className="bg-gray-100 p-2 border rounded">/Imagine prompt: {generatedPrompt}::</div>
//       </div>
//       {/* Add filter selection here */}
//       {/* Display generated prompt here */}
//       <div className="mt-4">
//         <button
//           className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           onClick={generatePrompt}
//         >
//           Generate Prompt
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import copy from 'clipboard-copy'; // Import the clipboard-copy library

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const filtersData = {
    // ... (your filter data remains the same)
  };

  const handlePromptChange = (e) => {
    const newText = e.target.value;
    setPrompt(newText);
    updateGeneratedPrompt(newText, selectedFilters);
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    updateGeneratedPrompt(prompt, { ...selectedFilters, [filterName]: value });
  };

  const updateGeneratedPrompt = (text, filters) => {
    let generated = text;

    for (const filterName in filters) {
      if (filters.hasOwnProperty(filterName)) {
        const filterValue = filters[filterName];

        if (filterName === 'Exclude') {
          generated += ` -${filterValue}`;
        } else if (filterValue !== 0 && filterValue !== '') {
          if (Array.isArray(filtersData[filterName])) {
            generated += ` ${filterName}:${filterValue}`;
          } else {
            generated += ` ${filterName}=${filterValue}`;
          }
        }
      }
    }

    setGeneratedPrompt(generated);
  };

  const handleCopyToClipboard = async () => {
    try {
      await copy(generatedPrompt);
      setCopySuccess(true);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 min-h-screen flex items-center justify-center">
      <div className="w-full md:w-2/3 p-6 rounded-lg shadow-lg bg-white text-gray-800">
        <h1 className="text-3xl font-semibold mb-4">Midjourney Prompt Helper</h1>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="prompt">
            Enter your prompt:
          </label>
          <textarea
            id="prompt"
            placeholder="Enter your prompt here..."
            className="w-full p-4 border rounded-lg text-lg"
            value={prompt}
            onChange={handlePromptChange}
          />
        </div>
        <div className="md:flex md:flex-wrap">
          {Object.keys(filtersData).map((filterName) => (
            <div className="mb-4 w-full md:w-1/6 md:pr-2" key={filterName}>
              <label className="block text-lg font-medium mb-2" htmlFor={filterName}>
                {filterName}:
              </label>
              {typeof filtersData[filterName] === 'string' ? (
                <input
                  type="text"
                  id={filterName}
                  className="w-full p-4 border rounded-lg text-lg"
                  value={selectedFilters[filterName] || ''}
                  onChange={(e) => handleFilterChange(filterName, e.target.value)}
                />
              ) : Array.isArray(filtersData[filterName]) ? (
                <select
                  id={filterName}
                  className="w-full p-4 border rounded-lg text-lg"
                  value={selectedFilters[filterName] || ''}
                  onChange={(e) => handleFilterChange(filterName, e.target.value)}
                >
                  <option value="">No Filter</option>
                  {filtersData[filterName].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  id={filterName}
                  className="w-full p-4 border rounded-lg text-lg"
                  value={selectedFilters[filterName] || ''}
                  onChange={(e) => handleFilterChange(filterName, e.target.value)}
                  min="0"
                  max="50"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Generated Prompt:</label>
          <div className="bg-gray-100 p-4 border rounded-lg text-lg">{generatedPrompt}</div>
          {copySuccess && (
            <p className="text-green-600 mt-2">Copied to clipboard!</p>
          )}
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg text-lg"
            onClick={handleCopyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

