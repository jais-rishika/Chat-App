import React, { createContext } from 'react';
import {defaultSettings} from '../config';
import useLocalStorage from '../hooks/useLocalStorage';
const initialState={...defaultSettings,onToggleMode:()=>{},}

const SettingsContext=createContext(initialState);
const SettingsProvider = ({children}) => {
    console.log("settingcontext");
    const [settings,setSettings]=useLocalStorage("settings",{themeMode: initialState.themeMode})
    const onToggleMode=()=>{
        console.log("toggle")
        setSettings({
            ...settings,
            themeMode: settings.themeMode==="light"?"dark":"light",
        });
    }
    return (
        <SettingsContext.Provider value={{...settings,onToggleMode}}>
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingsContext;
export {SettingsProvider};

