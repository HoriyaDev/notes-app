// import React, { useState  , useEffect} from "react";
// import { doc, setDoc , getDoc } from "firebase/firestore";
// import { db } from "./config/firebase";

// const Notes = () => {
//   const [noteContent, setNoteContent] = useState("");
//   const [retrieve , setRetrieve] = useState('')

//   const handleAdd = async () => {
//     if (!noteContent.trim()) {
//       alert("Note cannot be empty!");
//       return;
//     }

//     try {
//       const uniqueID = Date.now().toString(); 
//       await setDoc(doc(db, "notes", uniqueID), { content: noteContent });

//       setNoteContent(""); 
//       alert("Note added successfully!");
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };



//   useEffect( async()=>{

//     const docRef = doc(db , 'notes')

//     try{
//       const snapshoot = await getDoc(docRef)
//       console.log(snapshoot)
//       if(snapshoot.exists()){
//         const getData = snapshoot.data()
//         setRetrieve(getData)
//       }
      
    

      
//     }
//     catch(error){
//       console.log(error.message)
//     }

//   },[])

//   return (
//     <>
    
//     <div className="flex justify-center items-center mt-3">
//       <input
//         type="text"
//         placeholder="Add Notes"
//         className="px-4 py-2 border"
//         value={noteContent}
//         onChange={(e) => setNoteContent(e.target.value)}
//       />
//       <button
//         type="button"
//         onClick={handleAdd}
//         className="bg-slate-500 px-4 py-2 text-white ml-2"
//       >
//         Add
//       </button>
//     </div>

//     <div>

//       <p>{retrieve}</p>
//     </div>


//     </>

//   );
// };

// export default Notes;




import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

const Notes = () => {
  const [noteContent, setNoteContent] = useState("");
  const [retrieve, setRetrieve] = useState("");

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


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes")); // Get all docs
        const notesArray = [];
  
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().content); // Logs each doc
          notesArray.push(doc.data().content); // Store content in array
        });
  
        setRetrieve(notesArray); // Store all notes in state
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };
  
    fetchNotes();
  }, []);

  // useEffect(() => {
  //   const fetchNote = async () => {
  //     try {
  //       // const docRef = doc(db, "notes"); 
  //       const snapshot = await getDocs(collection(db , 'notes'));

        
  //         console.log(snapshot.id, " => ", snapshot.data().content);
  //        setRetrieve(snapshot.data().content)
        

  //       // if (snapshot.exists()) {
  //       //   setRetrieve(snapshot.data().content); // Extract the content field
  //       // } else {
  //       //   console.log("No such document!");
  //       // }
  //     } catch (error) {
  //       console.error("Error fetching note:", error.message);
  //     }
  //   };

  //   fetchNote();
  // }, []);

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
        <p>{retrieve}</p>
      </div>
    </>
  );
};

export default Notes;
