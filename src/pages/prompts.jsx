import React, { useState } from 'react';
import copy from 'clipboard-copy';

function Prompts() {
    const [prompt, setPrompt] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const filtersData = {
        Aspect: ['1:1', '5:4', '3:2', '7:4', '16:9', '2:1', '9:6', '1:2'],
        Version: ['5.2', '5.1', '5', '4', '3', '2', '1', 'niji'],
        Quality: ['.25', '.5', '1'],
        Tile: ['no', 'yes'],
        Exclude: '',
        Stylize: 0,
        Chaos: 0,
        Stopped: 0,
        Repeat: 0,
        Weird: 0,
        Speed: 0,
    };

    const handlePromptChange = (e) => {
        const newText = e.target.value;
        setPrompt(newText);
        updateGeneratedPrompt(newText,selectedFilters);
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
                    generated += ` --no ${filterValue}`;
                } else if (filterValue !== 0 && filterValue !== '') {
                    if (Array.isArray(filtersData[filterName])) {
                        generated += ` --${filterName.toLocaleLowerCase()} ${filterValue}`;
                    } else {
                        generated += ` --${filterName.toLocaleLowerCase()} ${filterValue}`;
                    }
                }
            }
        }

        setGeneratedPrompt(generated);
    };

    const handleCopyToClipboard = async () => {
        try {
            await copy("/imagine prompt: " + generatedPrompt);
            setCopySuccess(true);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <div className='bg-white min-h-screen flex items-center justify-center'>
            <div className="w-full md:w-2/3 p-6 rounded-lg shadow-lg bg-darkcream text-gray-800">
                <h1 className="text-4xl font-bold mb-4 text-violet-900 uppercase text-center p-4">Midjourney Prompt Helper</h1>
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
                        Enter your prompt:
                    </label> */}
                    <textarea
                        id="prompt"
                        placeholder="Start typing your idea..."
                        className="w-full p-2 rounded shadow placeholder-slate-400 outline-0"
                        value={prompt}
                        onChange={handlePromptChange}
                    />
                </div>
                <div className="md:flex md:flex-wrap">
                {Object.keys(filtersData).map((filterName) => (
                    <div className="mb-4 w-full md:w-1/6 md:pr-2" key={filterName}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={filterName}>
                            {filterName}:
                        </label>
                        {typeof filtersData[filterName] === 'string' ? (
                            <input
                                type="text"
                                id={filterName}
                                className="w-full p-2 border rounded outline-0"
                                value={selectedFilters[filterName] || ''}
                                onChange={(e) => handleFilterChange(filterName, e.target.value)}
                            />
                        ) : Array.isArray(filtersData[filterName]) ? (
                            <select
                                id={filterName}
                                className="w-full p-2 border rounded outline-0"
                                value={selectedFilters[filterName] || ''}
                                onChange={(e) => handleFilterChange(filterName, e.target.value)}
                            >
                                <option value="">---</option>
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
                                className="w-full p-2 border rounded outline-0"
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Generated Prompt:</label>
                    <div className="bg-gray-100 p-2 border rounded">/imagine prompt: {generatedPrompt}</div>
                    {copySuccess && <p className="text-green-600 mt-2 text-center">Copied to clipboard!</p>}
                </div>
                <div className="m-4 flex justify-center">
                    <button
                        className="bg-violet-100 text-violet-900 py-2 px-4 m-2 rounded hover:bg-violet-200"
                        onClick={handleCopyToClipboard}> Copy Prompt </button>
                    <button
                        className="bg-violet-900 text-violet-100 py-2 px-4 m-2 rounded hover:bg-violet-200 hover:text-violet-900"
                        onClick=''> Save to My Prompts </button>
                </div>
            </div>
        </div>
    );
}

export default Prompts;
