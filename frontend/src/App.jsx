import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  const { user, isCheckingAuth,authCheck } = useAuthStore()
  console.log("auth user is here: ", user)

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>    {/* pro tip if we are using the same width and height then we can use size-10 */}
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      {/* // here we created routes for the pages in the pages folder so thate we can have multiple pages in our app */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />}/>         {/* if the user is not logged in then show the signup page else show the home page */}
      <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
      <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
      <Route path="/*" element={<NotFoundPage />} />


      <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
    </Routes>
    <Footer />

    <Toaster />
    </>
  )
}

export default App;
