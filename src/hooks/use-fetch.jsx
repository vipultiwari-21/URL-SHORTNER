import { useState } from "react";

const useFetch = (cb, options = {}) => { // useFetch taking a callback function and options related to it
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    
    const fn = async (... args) => { // async function
    setLoading (true); 
    setError (null); // setting loading and Error true by default just like we do before fetching some Api
try {
    const response = await cb(options, ...args); // cb an scalable custom hook for fetching our API , we will provide  options and ...args because in the end we are providing that in return data loading etc
    setData (response); // response set into Data
    } catch (error) {
    setError (error);
    } finally{
    setLoading(false);// this will run no matter if it goes to try or catch
    }
};

return {data, loading, error, fn};

};

export default useFetch;
