import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from 'yup';
import useFetch from "@/hooks/use-fetch";
import { QRCode } from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";



const CreateLink = () => {

  const { user } = UrlState(); // so that we can assign the url to the correct user
  
  const navigate = useNavigate(); // navigate the user after the url has been created

  const ref = useRef();
  
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  // create the state for our form

  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "", // auto-filled or empty 
    customUrl: "",
  });

  // schema

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URl")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
   };

   const {
    loading,
    error,
    data,
    fn: fnCreateUrl,

  } = useFetch(createUrl, { ...formValues, user_id: user.id});

  
   useEffect(() => {
      if (error === null && data) {
      navigate(`/link/${data[0].id}`);
        }
      }, [error, data]);
   

  

    const createNewLink = async () => {
        setErrors([]);
        try {
          // checking the schema errors
          await schema.validate(formValues, {abortEarly: false});
            const canvas = ref.current.canvasRef.current // the qr code image has an id named canvas
            const blob = await new Promise((resolve) => canvas.toBlob(resolve)); // we succesfully get our qr here in the blob

            await fnCreateUrl(blob);
        } catch (e) {

          const newErrors = {};

          e?.inner?.forEach((err) => {
            newErrors[err.path] = err.message;
          });
          setErrors(newErrors);
        }
    };
  
  return (
      <Dialog defaultOpen={longLink} // if there is something in the longlink it will open by default
      onOpenChange={(res)=> {if(!res) setSearchParams({}); // as soon as it opens we will remove it from our URl
      }} 
      >
  <DialogTrigger>
    <Button variant="destructive">Create New Link </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md"> 
    <DialogHeader>
      <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
    </DialogHeader>

    {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref}/>}

    <Input 
      id="title" 
      placeholder ="Short Link's Title"
      value={formValues.title}
      onChange={handleChange}
      />
          {errors.title && <Error message={errors.title} />}

    <Input 
      id="longUrl" 
      placeholder ="Enter your Looooong URL" 
      value={formValues.longUrl}
      onChange={handleChange} 
      />
          {errors.longUrl && <Error message={errors.longUrl} />}  

    <div className="flex items-center gap-2">
      <Card className="p-2">trimrr.in</Card> /
      <Input 
        id="customUrl" 
        placeholder ="Custom Link (optional)"
        value={formValues.customUrl}
        onChange={handleChange}   
       />
    </div>
            {error && <Error message={"error.message"} />}

    <DialogFooter className="sm:justify-start">
        <Button 
          disabled={loading} 
          onClick={createNewLink} 
          variant="destructive"
        >
          {loading ? <BeatLoader size={10} color="white" /> : "Create"}
        </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  );
};

export default CreateLink;
