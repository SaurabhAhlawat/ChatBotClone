import { useState, useEffect } from 'react';

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function keyWithPrefix(key) {
    return key ? '_jcb_'+key : key;
}

function getLocalStorageOrDefault(key, defaultValue) {
  const stored = localStorage.getItem(keyWithPrefix(key));
  if (!stored) {
    return defaultValue;
  }
  return isJsonString(stored) ? JSON.parse(stored) : stored;
}

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(keyWithPrefix(key), JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
		window.addEventListener('storage', (e) => {
      if(keyWithPrefix(key) === e.key){
        setValue(JSON.parse(e.newValue))
      }
		 });
	}, []);

  return [value, setValue];
}