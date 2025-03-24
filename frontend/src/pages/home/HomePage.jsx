import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {

  // this value is hardcoded so that if it is true then the user is logged in or else the user is not logged in
  const {user} = useAuthStore();

  return (
    <>
      {/* // this means if the user is logged in then show the HomeScreen else show the AuthScreen */}
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  )
}

export default HomePage