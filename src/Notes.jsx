import React, { useState, useEffect } from "react";
import { doc, deleteDoc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";

const Notes = () => {
  const [noteContent, setNoteContent] = useState("");
  const [retrieve, setRetrieve] = useState([]); 
  const [editId, setEditId] = useState(null); // Store the ID of the note being edited

  // Add new note
  const handleAdd = async () => {
    if (!noteContent.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), { content: noteContent });

      setNoteContent("");
      alert("Note added successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Fetch notes from Firestore
  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesArray = [];

      querySnapshot.forEach((doc) => {
        notesArray.push({ id: doc.id, content: doc.data().content });
      });

      setRetrieve(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      alert("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Edit note
  const handleEdit = (id, content) => {
    setEditId(id);
    setNoteContent(content); // Prefill input with existing content
  };

  // Save edited note
  const handleUpdate = async () => {
    if (!noteContent.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    try {
      const noteRef = doc(db, "notes", editId);
      await updateDoc(noteRef, { content: noteContent });

      setNoteContent("");
      setEditId(null); // Reset edit mode
      alert("Note updated successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-3">
        <input
          type="text"
          placeholder="Add Notes"
          className="px-4 py-2 border"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        {editId ? (
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 px-4 py-2 text-white ml-2"
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="bg-slate-500 px-4 py-2 text-white ml-2"
          >
            Add
          </button>
        )}
      </div>

      <div>
        {retrieve.map((note) => (
          <div key={note.id} className="flex justify-between items-center mt-4 bg-slate-600 p-2 w-1/2 mx-auto">
            <p>{note.content}</p>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 px-4 py-2"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleEdit(note.id, note.content)}
                className="bg-green-700 px-4 py-2"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
