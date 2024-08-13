import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if(longUrl) navigate (`/auth?createNew=${longUrl}`);
    }

  return ( 
  <div className="flex flex-col items-center">
    <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only  URL Shortener <br />you&rsquo;ll ever need! 👇 
    </h2>
    <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input 
        type="url" 
        value={longUrl}
        placeholder="Enter Your Long URL"
        onChange={(e) => setLongUrl(e.target.value)}
        className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full" type="submit" variant="destructive">
            Shorten!
        </Button>
    </form>
    <img src="/banner.jpg" alt="banner" className="w-full my-11 md:px-11" />

<Accordion type="multiple" collapsible className="w-full md:px-11">
  
  <AccordionItem value="item-1">
    <AccordionTrigger>How does the Trimrr URL Shortener works?</AccordionTrigger>
    <AccordionContent>
     When you enter a long URL, our system generates a shorter version of 
     that URl. This shortened URL redirects to the original long URL when 
     accessed.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
    <AccordionContent>
     Yes. Creating an account allows you to manage your URLs, view 
     analytics, and customize your short URLs.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
    <AccordionContent>
     You can view the number of clicks, geolocation data of the clicks
     and device types (mobile/desktop) for each of your shortened URLs.
    </AccordionContent>
  </AccordionItem>
</Accordion>
  </div>
  
    );
};

export default LandingPage;

// TODO: 👇 all this about handleShorten and navigate
// handleShorten function to make the URL shorten
// longUrl is a piece of state used to store the URL that the user wants to shorten.
// setLongUrl used as an state and passed as the value longurl and used as onChange e.target.value inside INPUT
// const handleShorten = (e) => { ... }: This line defines a function named handleShorten that takes an event (e) as its argument.
// const navigate = useNavigate();: This line uses the useNavigate hook from react-router-dom to get the navigate function, 
// which can be used to programmatically navigate to different routes in your application.
// e.preventDefault();: This prevents the default action of the event, which is typically used to prevent a form from submitting the traditional way and causing a page reload.
// if(longUrl) navigate(/auth?createNew=${longUrl});: This checks if longUrl is not undefined or empty. 
// If longUrl has a value, it navigates to the /auth route with a query parameter {createNew} set to the value of longUrl
// The user inputs a long URL into a text field.
// When the user submits the form, handleShorten is called.
// If the longUrl is not empty, the app navigates to /auth with the long URL as a query parameter.