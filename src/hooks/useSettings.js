import { useContext } from "react";
import SettingsContext from "../context/settingContext";
const useSettings = () => {
        return useContext(SettingsContext);
}

export default useSettings;
