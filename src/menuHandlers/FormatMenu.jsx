import React from 'react';

const FormatMenu = () => {
  return (
    <div className="absolute top-10 left-52 bg-white border shadow-md rounded-md p-2 w-48">
      <button className="block w-full text-left p-2 hover:bg-gray-200">Bold</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Italic</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Underline</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Align Left</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Align Center</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Align Right</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Change Cell Color</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Change Font Color</button>
    </div>
  );
};

export default FormatMenu;
