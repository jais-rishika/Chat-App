import './App.css';
//import Dashboard from "./layout/Dashboard/dashboard"
import SetTheme from "./theme/setTheme";
import { SettingsProvider } from './context/settingContext';
import Router  from './Router/index';
function App() {
  // Assuming you have a value you want to store
const valueToStore = "Hello, localStorage!";

// Save the value in local storage
localStorage.setItem('myValue', valueToStore);

  return (
    //must wrap the main component inside the contextProvider
    
      <SetTheme>
        <Router/>
      </SetTheme>
   
  );
}

export default App;
