import React from "react";
import Login from "./auth/Login";
import Notes from "./Notes";
import { BrowserRouter , Route , Routes } from "react-router-dom";

function App() {
  return (
   <>


<BrowserRouter>
<Routes>

  <Route path="/" element={<Login />} />
 
 {/* <Route path="/notes" element={<Notes />} /> */}
</Routes>


</BrowserRouter>
   
   </>
  );
}

export default App;
