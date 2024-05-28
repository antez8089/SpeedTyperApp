import React from 'react';

const Modal = ({ show, handlePlayAgain, handleEndForToday }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">KONIEC GRY</h1>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700" 
          onClick={handlePlayAgain}>
          FINISH
        </button>
        <button 
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" 
          onClick={handleEndForToday}>
          ONE MORE GAME
        </button>
      </div>
    </div>
  );
};

export default Modal;