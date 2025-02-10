import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./config/firebase";

const Notes = () => {
  const [noteContent, setNoteContent] = useState("");

  const handleAdd = async () => {
    if (!noteContent.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    try {
      const uniqueID = Date.now().toString(); 
      await setDoc(doc(db, "notes", uniqueID), { content: noteContent });

      setNoteContent(""); 
      alert("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-3">
      <input
        type="text"
        placeholder="Add Notes"
        className="px-4 py-2 border"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-slate-500 px-4 py-2 text-white ml-2"
      >
        Add
      </button>
    </div>
  );
};

export default Notes;
