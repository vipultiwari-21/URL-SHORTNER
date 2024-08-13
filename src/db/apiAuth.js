// Logic related to Login and Signup

import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}){ //This line defines an async function named login which takes an object with email and password properties as its argument. 
   const {data, error} = await supabase.auth.signInWithPassword({ // supabase.auth.signInWithPassword is an asynchronous method provided by Supabase to sign in a user using their email and password.
        email, // The await keyword is used to wait for the promise returned by signInWithPassword to resolve.  
        password,
    });// The result of the promise is destructured into data and error. If the sign-in is successful, data will contain the user information and session data. If there is an error, error will contain the error details.
    
    if(error) throw new Error(error.message); //This line checks if there is an error returned from the signInWithPassword method.
    // If an error exists, it throws a new Error with the error message. This will stop the execution of the function and propagate the error to be handled by the caller of the login function.
    
    return data; // If there is no error, this line returns the data object, which contains the user and session information.
}

export async function getCurrentUser() { // it will fetcht it from our local storage and show it to us which user is currently logged in
// we will use getCurrentUser for fetching the user in our context Api
    const {data: session, error} = await supabase.auth.getSession();

    if (!session.session) return null; // if there is no session return null 
    if(error) throw new Error(error.message);// checking for error display error if it is there

    return session.session?.user; // if everything is fine return user

}

// Created an API for signup the user logic

export async function signup({ name, email, password, profile_pic}) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
    const {error: storageError} = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

    if(storageError) throw new Error(storageError.message);


    const { data, error} = await supabase.auth.signUp({ // Api Call --- await supabase.auth.signUp
        email,
        password,
        options:{
            data: {
                name,
                profile_pic:`${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`, // storing our profile pic here
            },
        },
    });
    
    if(error) throw new Error(error.message);
    return data;
}

export async function logout() {
    const {error} = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}


