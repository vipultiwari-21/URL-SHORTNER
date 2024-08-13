import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/login";
import Signup from "@/components/signup";
import { UrlState } from "@/context";
import { useEffect } from "react";


const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
    const navigate = useNavigate();
    const {isAuthenticated, loading} = UrlState();

    useEffect(() => {
      if(isAuthenticated && !loading){ // agar user authenticated and loading false hai toh dashboard pe redirect kardo
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`); // it wont allow to go to auth when user is logged in 
      }
        
    }, [isAuthenticated, loading]); // dependencies for whenever it changes it wont allow to go to auth when user is logged in

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold">
          {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
         </h1>

<Tabs defaultValue="login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="signup">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="login">
    <Login />
  </TabsContent>
  <TabsContent value="signup">
    <Signup />
  </TabsContent>
</Tabs>

    </div>
  );
};

export default Auth;









// useSearchParams hook from react-router-dom to get the URL's query parameters.
// searchParams is an object that allows you to read query parameters from the URL.
// This component displays a message based on whether a specific query parameter (createNew) is present in the UR
// The h1 element displays different text based on whether the createNew query parameter is present in the URL.
// searchParams.get("createNew") checks if the createNew parameter exists.
// If createNew is present, it displays: "Hold up! Let's login first..".
// If createNew is not present, it displays: "Login / Signup".