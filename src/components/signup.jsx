import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const[errors, setErrors] = useState([]) // by default an Empty Array when we initaite handleLogin
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  
  const handleInputChange =(e)=> { // use this for changing all our inputs
  const{ name, value, files} = e.target;
  setFormData((prevState) =>({ // taking the previous state
    ...prevState, // spreading the previous state
    [name]: files ? files[0] : value, // setting the new state if its email will put the value and same for password field put the value
  }));
  };

 const {data, error, loading, fn: fnSignup} = useFetch (signup, formData) // it will take two things one is callback and we will provide the login callback from {apiAuth.js}and it will take the email password basically formData

 const { fetchUser } = UrlState();

 useEffect(() => {  // this will run only when the data or the error will change
  console.log(data)
  if(error === null && data) { // if there is no error and data is also there i will route them into dashboard page
    navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    fetchUser();
    
  }
 }, [error, loading])
 
 
 const handleSignup = async() => { // function will run when we will click on the login button & we will set all the errors to null for that we will create a new useState
    setErrors([]);
    try { // we will have an api call here 
      const schema = Yup.object().shape({
        name: Yup.string().min(3, "Name must be at least 3 character").required("Name is required"),
        email: Yup.string()
        .email("Invalid Email")
        .required("Email is Required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 character")
        .required("Password is Required"),
        profile_pic: Yup.mixed().required("Profile picture is required"), 
      });

      await schema.validate(formData, {abortEarly:false});
      await fnSignup() // it will take this formData go inside the login{apiAuth file} provide the supabase if error it will throw error else return the data
      //api call
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => { // inner object provided by Yup to catch errors
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors); // will catch all the errors using forEach in related to name , email , password and all these errors will catch in newError and setErrors
    }
  };
 
 
 
  return (
    
<Card>
  <CardHeader>
    <CardTitle>Signup</CardTitle>
    <CardDescription>
      Create a new account if you haven&rsquo;t already
    </CardDescription>
    {error && <Error message={error.message} />}
  </CardHeader>
  <CardContent className="space-y-2">
  <div className="space-y-1">
    <Input 
    name="name" 
    type="text" 
    placeholder="Enter Name"
    onChange={handleInputChange}
    />
   {errors.name && <Error message={errors.name} />}  {/*dynamic error message it will first check is the error.email exist then show the message */}
   </div>

   <div className="space-y-1">
    <Input 
    name="email" 
    type="email" 
    placeholder="Enter Email"
    onChange={handleInputChange}
    />
   {errors.email && <Error message={errors.email} />}  {/*dynamic error message it will first check is the error.email exist then show the message */}
   </div>

   <div className="space-y-1">
    <Input 
    name="password" 
    type="password" 
    placeholder="Enter Password"
    onChange={handleInputChange} 
    />
    {errors.password && <Error message={errors.password} />}
   </div>

   <div className="space-y-1">
    <Input 
    name="profile_pic" 
    type="file" 
    accept="image/*"
    onChange={handleInputChange} 
    />
    {errors.profile_pic && <Error message={errors.profile_pic} />}
   </div>

  </CardContent>
  <CardFooter>
      <Button onClick={handleSignup}>
        {loading ? <BeatLoader size={10} color="#36d7b7"/> : "Create Account"} 
        {/* //beatloader is the spinner  */}
      </Button>
  </CardFooter>
</Card>
 
  );
}

export default Signup;
