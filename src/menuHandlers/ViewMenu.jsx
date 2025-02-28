import React from 'react';

const ViewMenu = () => {
  return (
    <div className="absolute top-10 left-28 bg-white border shadow-md rounded-md p-2 w-48">
      <button className="block w-full text-left p-2 hover:bg-gray-200">Zoom In</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Zoom Out</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Reset Zoom</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Show Gridlines</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Show Headers</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Full Screen</button>
    </div>
  );
};

export default ViewMenu;
