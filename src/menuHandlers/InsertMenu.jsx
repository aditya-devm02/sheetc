import React from 'react';

const InsertMenu = () => {
  return (
    <div className="absolute top-10 left-40 bg-white border shadow-md rounded-md p-2 w-48">
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Row Above</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Row Below</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Column Left</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Column Right</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Image</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Insert Chart</button>
    </div>
  );
};

export default InsertMenu;
