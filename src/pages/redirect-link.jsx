import { storeClicks } from "@/db/apiClicks";
import { getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {

  const {id} = useParams(); // took id from our params
  
  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, { // for storing the clicks we will took out this from db and provide it useFetch
    id:data?.id, // id of short_url
    originalUrl: data?.original_url,
    });

    useEffect(() => {
        fn()
    }, [])

    useEffect(() => {
        if(!loading && data){
          fnStats();
        }
    }, [loading]);

    if(loading || loadingStats) {
      return (
        <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
        </>
      );
    }


  return null
};

export default RedirectLink;