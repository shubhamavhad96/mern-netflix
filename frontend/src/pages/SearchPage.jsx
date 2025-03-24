import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {

// these are the functions for the search page.
const [activeTab, setActiveTab] = useState("movies");   // this is the function for the tabs we're gonna see on top of the search page.
const [searchTerm, setSearchTerm] = useState("");       // this is the function for the search bar.
const [results, setResults] = useState([]);             // this is the function for the results we're gonna get from the search bar.

const {setContentType} = useContentStore();            // this is the function for the content type we're gonna get from the search bar.

// the below function is for the tabs we're gonna see on top of the search page.

const handleTabClick = (tab) => {
    setActiveTab(tab);
    // this is the if else statement for the content type we're gonna get from the search bar.
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);   // this line is to clear the results we're gonna get from the search bar. after we go to diferent tab. then the results will be cleared.
}

// the below function is for when we click the search button. it will handle the search bar.

const handleSearch = async (e) => {
    e.preventDefault();    // this is to prevent the page from refreshing.
    try {
       const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`); // this is the axios request to get the search results.
       setResults(res.data.content); // this is to set the results we're gonna get from the search bar.
    } catch (error) {
        if(error.response.status === 404) {
            toast.error("Nothing found, make sure you're searching under the right category."); 
        } else {
            toast.error("An error occurred, please try again later.");
        }
    }
}

console.log("results", results);


  return (
    <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
            {/* // this is the one who is gonna hold our buttons. */}
            <div className="flex justify-center gap-3 mb-4">
                <button 
                 // here the classes are dynamic based on the type of the tab we're gonna click.
                    className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                    onClick={() => handleTabClick("movie")}
                    >
                    Movies
                </button>

                <button 
                 // here the classes are dynamic based on the type of the tab we're gonna click.
                    className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                    onClick={() => handleTabClick("tv")}
                    >
                    TV Shows
                </button>

                <button 
                 // here the classes are dynamic based on the type of the tab we're gonna click.
                    className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                    onClick={() => handleTabClick("person")}
                    >
                    Person
                </button>
            </div>

            {/* // this is the one who is gonna hold our search bar. */}

            <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={"Search for a " + activeTab}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                    <Search className="size-6"/>
                </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((result) => {
                    if(!result.poster_path && !result.profile_path) return null;

                    return (
                        <div key={result.id} className="bg-gray-800 p-4 rounded">
                            {activeTab === "person" ? (
                                <Link to={"/actor/" + result.name} className="flex flex-col items-center">
                                    <img 
                                        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                                        alt={result.name}
                                        className="max-h-96 rounded mx-auto"
                                    />
                                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                                </Link>
                            ) : (
                                <Link to={"/watch/" + result.id} onClick={() => setContentType(activeTab)}>
                                    <img 
                                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                                        alt={result.title || result.name}
                                        className="w-full h-auto rounded"
                                    />
                                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SearchPage