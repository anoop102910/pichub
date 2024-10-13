import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/home/page";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./app/layout";
import About from "./app/about/page";
function App() {
    const { login } = useAuthContext();
    useEffect(() => {
        login();
    }, []);
    return (<>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomeLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center"/>
    </>);
}
export default App;
