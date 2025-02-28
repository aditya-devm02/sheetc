import React from 'react';

const FileMenu = () => {
  return (
    <div className="absolute top-10 left-2 bg-white border shadow-md rounded-md p-2 w-48">
      <button className="block w-full text-left p-2 hover:bg-gray-200">New</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Open...</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Save</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Save As...</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Print</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Download as CSV</button>
    </div>
  );
};

export default FileMenu;
