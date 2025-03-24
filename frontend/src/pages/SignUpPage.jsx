import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {

// below 2 lines of code will get the email from the URL that we are we are passing in the URL in the AuthSection.jsx file
// then the second line of code will set the email to the emailValue and then we will use the emailValue to set the email in the input field
// so that the user does not have to enter the email again and again

const {searchParams} = new URL(document.location)
const emailValue = searchParams.get('email')

const [email, setEmail] = useState(emailValue || '');   // here the last part of the code is to set the email to the emailValue and if the emailValue is null then set the email to an empty string
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const { signup } = useAuthStore();

// below is the function to handle the sign up after user click on the sign up button

  const handleSignUp = async (e) => {
    // we dont want to refresh the page when the user click on the sign up button.
    e.preventDefault();
    signup({ email, username, password });
  }
  return (
    <div className="h-screen w-full hero-bg">SignUpPage
    {/* the header will hold the navigation bar */}
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link to={"/"}>                     {/* this will take us to the home page */}
                <img src="/netflix-logo.png" alt="logo" className="w-52" />
            </Link>
        </header>

        {/* this one is for the Form to sign up */}

        <div className="flex items-center justify-center mt-20 mx-3">
            <div className="w-full max-w-md p-8 spcae-y-6 bg-black/60 rounded-lg shadow-md">
                <h1 className="text-center text-white text-2xl font-bold mb-4">
                    Sign Up
                </h1>
                <form className="space-y-4" onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                            Email
                        </label>
                        <input type="email" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus-ring"
                            placeholder="you@example.com"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                            Username
                        </label>
                        <input type="text" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus-ring"
                            placeholder="johndoe"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                            Password
                        </label>
                        <input type="password" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus-ring"
                            placeholder="********"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                        Sign Up
                    </button>

                    <div className="text-center text-gray-400">
                        Already a member? {" "}
                        <Link to={"/login"} className="text-red-500 hover:underline">Sign In</Link>
                    </div>

                </form>
            </div>
        </div>
    </div>
)
}

export default SignUpPage