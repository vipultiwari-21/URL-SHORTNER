import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return <div>
    <main className="min-h-screen container">
        {/* {Headers} */}
      <Header />
      <Outlet /> {/*  // to render the pages like landing dashboard etc */}
    </main>

    <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💖 by Vipul Tiwari 
    </div>
  </div>
}

export default AppLayout