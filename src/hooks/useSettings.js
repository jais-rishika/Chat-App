import { useContext } from "react";
import SettingsContext from "../context/settingContext";
const useSettings = () => {
        console.log("useSetting")
        return useContext(SettingsContext);
}

export default useSettings;
