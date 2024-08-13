// Adding Context API for User State
// will fetch current user session who is logged in

import {createContext, useContext, useEffect } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children}) => {
    
    const { data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);

    const isAuthenticated = user?.role === "authenticated";
    useEffect (() =>{
        fetchUser();
    }, []); 

    return (
            <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}> 
                {children}
            </UrlContext.Provider>
   );
};

export const UrlState = () =>{ // access the state of our app by every single time just importing the Url State
return useContext (UrlContext);
}

export default UrlProvider;

// TODO: Explanation of the code:👇
// createContext() is a function from React that creates a Context object. 
// UrlContext will be used to share data 
// (like URLs) across multiple components without having to pass props manually at every level.

// const UrlProvider = ({ children }) => {
//     return <UrlContext.Provider> {children} </UrlContext.Provider>;
// };

// UrlProvider is a component that will wrap the entire app (or parts of it) to make the context available 
// to all the nested components.
// children is a special prop that contains all the components nested inside UrlProvider.
// <UrlContext.Provider> is a component provided by the context that allows consuming components to subscribe to context changes. 
// Here, it's used to wrap children, making the context data available to them.


//  const isAuthenticated = user?.role === "authenticated";
//  this will just check is the user?.role is authenticated or not means is the user currently logged in

// const { data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);
// will simply fetch our getCurrentUser that is created we can call the fn:fetch user where ever we want to
 
// useEffect (() =>{
//     fetchUser();
// }, []); 

// whenever our app loads for the very first time this will run every single time on every single page to take the session of the user
