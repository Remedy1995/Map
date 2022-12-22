 import AuthSignIn from "./Auth/auth-signin";
import Dashboard from "./Screens/dashboard";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { UserContext } from "./User/userContext";
import { useState } from "react";

const user = localStorage.getItem("email");
function App() {
  const [logged,setlogged] =useState(user);
  return (
    <div>
    <Router>
      <UserContext.Provider value={[logged,setlogged]}>
      <Routes>
        <Route  exact path="/" element ={ <AuthSignIn/>}  />
      </Routes>
      <Routes>
      <Route  path="/dashboard"  element= {<Dashboard/>}/>
      </Routes>
      </UserContext.Provider>
    </Router>
    </div>
  );
}
export default App;
