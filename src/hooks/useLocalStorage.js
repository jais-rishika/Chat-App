import { useState ,useEffect} from 'react';

export default function useLocalStorage(Key, defaultValue){
    console.log("localhook");
    const[value,setValue]=useState(()=>{
        const storedValue=localStorage.getItem(Key);
        return storedValue===null?defaultValue : JSON.parse(storedValue);
    });
    useEffect(()=>{
        const listener=(e)=>{
            if(e.storageArea===localStorage && e.key === Key){
                setValue(JSON.parse(e.newValue))
            }
        };
        window.addEventListener("storage",listener);
        return()=>{
            window.removeEventListener("storage",listener);
        };
    },[Key,defaultValue])
    const setValueInLocalStorage =(current)=>{
        setValue(current);
        localStorage.setItem(Key,JSON.stringify(current));
        return current;
    }
    return [value,setValueInLocalStorage];
}
