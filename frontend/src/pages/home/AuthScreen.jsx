import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const AuthScreen = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate ("/signup?email=" + email);       // here we are navigating to the signup page and passing the email as a query parameter
  }
    
  return (
    <div className="hero-bg relative">

        {/* Navabar Component */}

        {/* // this means we will have maximum width of 6xl and mx-auto means it will be centered, flex means they will be side by side, items-center means they will be in the center 
        and justify-between means they will be spaced between that means the logo will be on the left and the sign in button will be on the right */}

        <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
            <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 md:w-52'"/>
            <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
                Sign In
            </Link>
        </header>


        {/* Hero section */}

        <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
            {/* // here text-4xl means for small screens and md:text-6xl means for medium screens  */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
            <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
            <p className="mb-4">Ready to watch? Enter your email to create or restart your membership.</p>

            {/* // this line for smaller screen they will be flex col like one below the other and for medium screens they will be flex row like side by side */}
            <form className="flex flex-col md:flex-row gap-4 w-1/2" onSubmit={handleFormSubmit}>

                {/* // this is the input field for the email in the form */}
                <input 
                    type="email"
                    placeholder="Email Address"
                    className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
                    Get Started
                    <ChevronRight className="size-8 md:size-10"/>
                </button>
            </form>
        </div>

        {/* Separator Component */}
           {/* // here aria hidden means it is hidden from the screen readers */}
           <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* First Section */}

          <div className="py-10 bg-black text-white">
            {/* // here we will have left and right and whenever we say flex it means they will be side by side */}
            <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
                        <p className="text-lg md:text-xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                    </div>

                {/* Right Side */}
                    <div className="flex-1 relative">
                        {/* // using the z index we are putting the tv image on top of the video or else the remote will not be visible */}
                        <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
                        {/* // this is where we're gonna put the video in side the image of the tv */}
                        <video className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"   // here we are centering the video inside the tv image
                            playsInline                         // this line is for the video to play inline and not go full screen
                            autoPlay                            // this line is for the video to autoplay
                            muted                               // this will mute the video
                            loop                                // using this line the video will loop
                        >
                            <source src="/hero-vid.m4v" type="video/mp4"/>
                        </video>
                    </div>

            </div>
          </div>

        {/* Separator Component */}

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* Second Section */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                    {/* Left Side */}
                        <div className="flex-1">
                            <div className="relative">
                                <img src="/stranger-things-lg.png" alt="Stranger Tings image" className="mt-4"/>
                                {/* // this for the gif that we are gonna put on top of the image */}
                                <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
                                    w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                                    <img src="stranger-things-sm.png" alt="image" className="h-full"/>
                                    <div className="flex justify-center items-center w-full">
                                        <div className="flex flex-col gap-0">
                                            <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                                            <span className="text-sm text-blue-500">Downloading...</span>
                                        </div>
                                        <img src="/download-icon.gif" alt="" className="h-12"/>

                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* // because we missed this flex 1 the right side it was causing the left side to take the whole width so thats why the small image was taking the whole width */}
                    {/* Right Side */}
                        <div className="flex-1 md:text-left text-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">Download your shows to watch offline</h2>
                            <p className="text-lg md:text-xl">Save your favorites easily and always have something to watch.</p>
                        </div>
                </div>
            </div>

        {/* Separator Component */}

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* Third Section */}
        <div className="py-10 bg-black text-white">
            {/* // here we will have left and right and whenever we say flex it means they will be side by side */}
            <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                {/* Left Side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Watch everywhere</h2>
                        <p className="text-lg md:text-xl">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>

                {/* Right Side */}
                    <div className="flex-1 relative overflow-hidden">
                        {/* // using the z index we are putting the tv image on top of the video or else the remote will not be visible */}
                        <img src="/device-pile.png" alt="Device image" className="mt-4 z-20 relative" />
                        {/* // this is where we're gonna put the video in side the image of the tv */}
                        <video className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"   // here we are centering the video inside the tv image
                            playsInline                         // this line is for the video to play inline and not go full screen
                            autoPlay                            // this line is for the video to autoplay
                            muted                               // this will mute the video
                            loop                                // using this line the video will loop
                        >
                            <source src="/video-devices.m4v" type="video/mp4"/>
                        </video>
                    </div>

            </div>
          </div>

        {/* Separator Component */}

        <div className="h-2 w-full bg-[#232323]" aria-hidden="true"/>

        {/* Fourth Section */}
            <div className="py-10 bg-black text-white">
               <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row      
                    px-4 md:px-2">    {/* flex col reverse means the text will be on top and the image will be at the bottom */}
                    {/* Left */}
                      <div className="flex-1 relative">
                        <img src="/kids.png" alt="Enjoy on your TV" className="mt-4"/>
                      </div>
                    {/* Right */}
                       <div className="flex-1 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Create profiles for kids</h2>
                            <p className="text-lg md:text-xl">Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                       </div>
                </div>     
            </div>
    </div>
  )
}

export default AuthScreen