// import React, { useState, useEffect } from "react";
// import { doc, setDoc, getDoc,deleteDoc ,  collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "./config/firebase";

// const Notes = () => {
//   const [noteContent, setNoteContent] = useState("");
//   const [retrieve, setRetrieve] = useState([]);
//   const [selected , setSelected] = useState('')



//   //// add notes to sub collection
//   // const handleAdd = async () => {
//   //   if (!noteContent.trim()) {
//   //     alert("Note cannot be empty!");
//   //     return;
//   //   }

//   //   try {
//   //     // Reference the "subnotes" subcollection inside the "notes" document with ID "1739218654032"
//   //     const subnotesCollectionRef = collection(db, "notes", "1739218654032", "subnotes");

//   //     // Use addDoc() to automatically generate a new document ID inside "subnotes"
//   //     await addDoc(subnotesCollectionRef, { content: noteContent });

//   //     setNoteContent(""); 
//   //     alert("Sub-note added successfully!");
//   //   } catch (error) {
//   //     console.error("Error adding sub-note:", error.message);
//   //   }
//   // };


//    // add data to "notes" collection
//   const handleAdd = async () => {
//     if (!noteContent.trim()) {
//       alert("Note cannot be empty!");
//       return;
//     }

//     try {
     
     

//       await addDoc(collection(db, "notes"), { content: noteContent });

//       setNoteContent(""); 
//       alert("Note added successfully!");
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };




//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "notes"));
//         const notesArray = [];

//         querySnapshot.forEach((doc) => {
//           notesArray.push(doc.data().content);
//         });

//         setRetrieve(notesArray);
//       } catch (error) {
//         console.error("Error fetching notes:", error.message);
//       }
//     };

//     fetchNotes();
//   }, []);


//   const handleDelete = async () =>{

//     await deleteDoc(collection(db , "notes" , '1739218654032'))




//   }

//   return (
//     <>
//       <div className="flex justify-center items-center mt-3">
//         <input
//           type="text"
//           placeholder="Add Notes"
//           className="px-4 py-2 border"
//           value={noteContent}
//           onChange={(e) => setNoteContent(e.target.value)}
//         />
//         <button
//           type="button"
//           onClick={handleAdd}
//           className="bg-slate-500 px-4 py-2 text-white ml-2"
//         >
//           Add
//         </button>
//       </div>

//       <div>
//   {retrieve.map((note, index) => (
//     <div key={index} className="flex justify-between items-center mt-4 bg-slate-600 p-2 w-1/2 mx-auto">
//       <p>{note}</p>
      
   
//       <div className="ml-auto flex gap-2">
//         <button type="button" onClick={handleDelete} className="bg-red-500 px-4 py-2">Delete</button>
//         <button className="bg-green-700 px-4 py-2">Edit</button>
//       </div>
//     </div>
//   ))}
// </div>

//     </>
//   );
// };

// export default Notes;










import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, addDoc , updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";

const Notes = () => {
  const [noteContent, setNoteContent] = useState("");
  const [retrieve, setRetrieve] = useState([]); // Store both ID and content
  

  // Add data to "notes" collection
  const handleAdd = async () => {
    if (!noteContent.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    try {
      // Add a new document to the "notes" collection
      await addDoc(collection(db, "notes"), { content: noteContent });

      setNoteContent(""); // Clear input field
      alert("Note added successfully!");

      // Refresh the notes list after adding a new note
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

      setRetrieve(notesArray); // Update state with IDs and content
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Delete a specific note
  const handleDelete = async (id) => {
    try {
      // Delete the document with the specified ID
      await deleteDoc(doc(db, "notes", id));
      alert("Note deleted successfully!");

      // Refresh the notes list after deletion
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };


  const handleEdit = async (id) =>{
    
  }

  // Fetch notes on component mount
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
        <button
          type="button"
          onClick={handleAdd}
          className="bg-slate-500 px-4 py-2 text-white ml-2"
        >
          Add
        </button>
      </div>

      <div>
        {retrieve.map((note) => (
          <div key={note.id} className="flex justify-between items-center mt-4 bg-slate-600 p-2 w-1/2 mx-auto">
            <p>{note.content}</p>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => handleDelete(note.id)} // Pass the document ID to handleDelete
                className="bg-red-500 px-4 py-2"
              >
                Delete
              </button>
              <button type="button" onClick={()=>handleEdit(note.id)}  className="bg-green-700 px-4 py-2">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;