// Apis for fetch URL code in this component 


import supabase, { supabaseUrl } from "./supabase";


// Api for get all urls related to user

export async function getUrls(user_id) { // fetch all the urls related to that user
    const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
    
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load URLS");
    }
    
    return data;
}

// Api for Delete Url

export async function deleteUrl(id) { 
    const {data, error} = await supabase.from("urls").delete().eq("id", id);
    
    if(error) {
        console.error(error.message);
        throw new Error("Unable to load URLs");
    }
    
    return data;
}

// Api for Create Link

export async function createUrl({ title, longUrl, customUrl, user_id }, qrcode) {
    const short_url = Math.random().toString(36).substring(2,6)
    const fileName = `qr-${short_url}`;

    const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

    if(storageError) throw new Error(storageError.message);

    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`


    const {data, error} = await supabase
    .from("urls")
    .insert([
        {
        title, 
        original_url: longUrl, 
        custom_url:   customUrl || null, 
        user_id,
        short_url,
        qr,
        },
    ]).select();
    
    if(error) {
        console.error(error.message);
        throw new Error("Error creating short URl");
    }
    
    return data;
}

// when we hit endPoint it will take this id of shortUrl or custom Url and wil fetch the longUrl from the database and we can redirect it 

export async function getLongUrl(id) { 
    const {data, error} = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`) // if short_url equal to id that's good else compare the custom_url equal to the id 
    // either of these whatever matches will get that
    .single();
    
    if(error) {
        console.error(error.message);
        throw new Error("Error fetching short link ");
    }
    
    return data;
}



export async function getUrl({id, user_id}) {  // id of the user
    const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

    if(error) {
        console.error(error.message);
        throw new Error("Short URL not found");
    }
    
    return data;
}



