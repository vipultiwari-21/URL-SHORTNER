// Clicks related to that Particular User that we gonna show on the dashboard

import supabase from "./supabase";
import UAParser from "ua-parser-js";

export async function getClicksForUrls(urlIds) { // take and array of Ids for the urls and we want to fetch the clicks for all of these
    const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
    
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load Clicks");
    }
    
    return data;
}

// after we found our original URL we will also store the stats for that particular User like device location etc..to get this data will install a library UA parser

const parser = new UAParser();
export const storeClicks = async ({id, originalUrl}) => {
    try {
        const res = parser.getResult(); // function which give the information of the user device
        const device = res.type || "desktop";

        const response = await fetch("https://ipapi.co/json");
        const {city, country_name: country} = await response.json(); // getting the country and city of the user from the API
        
        await supabase.from("clicks").insert({
            url_id: id,
            city: city,
            country: country,
            device: device,
        });

        window.location.href = originalUrl // routing the user to original URL
        
    } catch (error) {
        console.error("Error recording click:", error);        
    }
}


export async function getClicksForUrl(url_id) { 
    const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

    if(error) {
        console.error(error.message);
        throw new Error("Unable to Load Stats");
    }
    
    return data;
}


