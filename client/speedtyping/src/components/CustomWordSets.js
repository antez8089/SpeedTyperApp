import { useEffect, useState } from "react";
import api from"../api/axiosConfig"
import Cookies from "js-cookie";



function CustomWordSets() {
    const [wordSets, setWordSets] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [selectedSetData, setSelectedSetData] = useState();

    useEffect(() => {
        loadWordSets();
    }, [])

    const loadWordSets = async () => {
        const accessToken = Cookies.get("access_token");

        const response = await api.get("/user/new-get-all-sets", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setWordSets(response.data);
    }

    const createWordSet = async (data) => {
        const accessToken = Cookies.get("access_token");

        const body = {
            words: data.words,
            name: data.name
        }

        const response = await api.post("/user/new-words-set", body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }


    const handleCreateSubmit = (data) => {
        createWordSet(data);
        setWordSets([...wordSets, {id: wordSets.length + 1, ...data}]);
        setIsModalCreateVisible(false);
    }

    const handleEditSubmit = (data) => {
        console.log(data);
        setIsModalEditVisible(false);
    }

    const handleDelete = (id) => {
        setWordSets(wordSets.filter((wordSet) => wordSet.id !== id));
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
            <div>
                <div className="bg-gray-200 px-4 py-2 rounded-lg flex justify-center items-center">
                    <h1>Your word sets</h1>
                </div>
                <div className="my-3 pr-2 flex flex-col overflow-y-scroll max-h-96 custom-scrollbar">
                    {wordSets.length > 0
                    ? wordSets.map((wordSet) => {
                        return (
                            <WordSet
                            key={wordSet.name}
                            wordSet={wordSet}
                            handleDelete={() => handleDelete(wordSet.id)}
                            handleEdit={() => {
                                setSelectedSetData(wordSet);
                                setIsModalEditVisible(true);
                                }}
                            />
                        )
                    })
                    : <div className="p-2 bg-gray-700 rounded-lg">Word sets are empty</div>
                }
                </div>
            </div>
            <button onClick={() => setIsModalCreateVisible(true)} className="bg-sky-600 hover:bg-sky-700 px-3 py-2 rounded-lg hover:cursor-pointer">
                Add set
            </button>
            <ModalCreateSet onClose={() => setIsModalCreateVisible(false)} onSubmit={handleCreateSubmit} isVisible={isModalCreateVisible} />
            <ModalEditSet  selectedData={selectedSetData} onClose={() => setIsModalEditVisible(false)} onSubmit={handleEditSubmit} isVisible={isModalEditVisible} />
        </div>
    )
}

export default CustomWordSets;


function WordSet({ wordSet, handleDelete, handleEdit }) {
    const [buttonsVisible, setButtonsVisible] = useState(false);
    
    return (
        <div
        className="bg-gray-700 p-2 my-2 rounded-lg w-44 hover:bg-gray-600"
        onMouseEnter={() => setButtonsVisible(true)}
        onMouseLeave={() => setButtonsVisible(false)}
        >
            <div className="flex justify-between gap-4 h-14">
                <div className="max-w-24">
                    <h2 className="text-sky-400 font-bold truncate">{wordSet.name}</h2>
                    <p className="text-sky-600">{wordSet.words.length} words</p>
                </div>
                <div className={`flex flex-col gap-1 ${buttonsVisible ? 'block' : 'hidden'}`}>
                    <button
                    onClick={handleEdit}
                    className="bg-blue-500 hover:bg-blue-700 rounded-lg hover:cursor-pointer">
                        Edit
                    </button>
                    <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 rounded-lg">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}


function ModalCreateSet({ onClose, onSubmit, isVisible }) {
    const [name, setName] = useState("");
    const [words, setWords] = useState([]);


    if (!isVisible) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, words })
    }

  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-700 text-white p-4 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Create New Set</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block">Name</label>
                <input
                id="name"
                type="text"
                placeholder="Enter data"
                required
                className="p-2 border border-gray-300 text-black rounded w-full"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="words" className="block">Words</label>
                <textarea
                id="words"
                placeholder="Enter words separated by space"
                required
                className="p-2 border border-gray-300 text-black rounded w-full resize-none h-52"
                onChange={(e) => setWords(e.target.value.split(" "))}
                />
            </div>
            
            <div className="flex justify-between space-x-2">
                <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    );
}


function ModalEditSet({ selectedData, onClose, onSubmit, isVisible }) {
    const [name, setName] = useState("");
    const [words, setWords] = useState([]);


    

    useEffect(() => {
        if (!selectedData) return;
        setName(selectedData.name);
        setWords(selectedData.words.join(" "));
    }, [selectedData])

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, words })
    }

    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-700 text-white p-4 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">{`Edit ${selectedData.name} set`}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block">Name</label>
                <input
                id="name"
                type="text"
                value={name}
                required
                className="p-2 border border-gray-300 text-black rounded w-full"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="words" className="block">Words</label>
                <textarea
                id="words"
                value={words}
                required
                className="p-2 border border-gray-300 text-black rounded w-full resize-none h-52"
                onChange={(e) => setWords(e.target.value)}
                />
            </div>
            
            <div className="flex justify-between space-x-2">
                <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
          </form>
        </div>
      </div>
    );
}