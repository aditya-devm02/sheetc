import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const EditMenu = ({ onUndo, onRedo, onTrim, onUpper, onLower, onRemoveDuplicates, onFindAndReplace }) => {
  useEffect(() => {
    return () => {
      console.log("EditMenu unmounted");
    };
  }, []);

  return createPortal(
    <div
      className="fixed top-14 left-16 bg-white border shadow-lg rounded-md p-2 w-48 z-50"
    >
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onUndo}>Undo</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onRedo}>Redo</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200">Cut</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Copy</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Paste</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200">Delete</button>
      <hr className="my-2" />
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onTrim}>Trim</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onUpper}>Uppercase</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onLower}>Lowercase</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onRemoveDuplicates}>Remove Duplicates</button>
      <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onFindAndReplace}>Find & Replace</button>
    </div>,
    document.body // ✅ Portal ensures React still tracks this element
  );
};

export default EditMenu;
