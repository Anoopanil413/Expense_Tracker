import { useEffect, useState } from "react";

export default function localStorageHook(key){
    const [value, setValue] =useState(()=>{
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : undefined;
            
        } catch (error) {
            console.log(error)
            return undefined;
        }
    })
    useEffect(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error(error);
        }
      }, [key, value]);
    
      return [value, setValue];
    

}