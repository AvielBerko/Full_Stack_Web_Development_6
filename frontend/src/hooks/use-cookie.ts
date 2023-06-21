import { useEffect, useState } from 'react';

export const useCookie = (cookieName: string): [string, () => void] => {
  const [cookieValue, setCookieValue] = useState<string>("");
  
    useEffect(() => {
      const getCookie = () => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(";");
  
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.startsWith(cookieName + "=")) {
            const cookieValue = cookie.substring(cookieName.length + 1);
            return cookieValue;
          }
        }
  
        return "";
      };
      
      const value = getCookie();
      setCookieValue(value);
    }, [cookieName]);
    
    const clearCookie = () => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      setCookieValue("");
    };

    return [cookieValue, clearCookie];
  }