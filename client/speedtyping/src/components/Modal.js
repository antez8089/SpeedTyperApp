import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ show, handlePlayAgain, handleEndForToday }) => {
  const navigate = useNavigate();

  const handleEndAndNavigate = () => {
    handleEndForToday();
    navigate('/user');
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">GAME OVER</h1>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700" 
          onClick={handlePlayAgain}>
          ONE MORE GAME
        </button>
        <button 
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" 
          onClick={handleEndAndNavigate}>
          FINISH
        </button>
      </div>
    </div>
  );
};

export default Modal;