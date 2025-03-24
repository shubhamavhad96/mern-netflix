import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";


const WatchPage = () => {
    const { id } = useParams();       // this is for getting the id from the url
    const [trailers, setTrailers] = useState([]);    // this is for storing the trailers in the state
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);   // this is for storing the current trailer index
    const [loading, setLoading] = useState(true);    // this is for if the trailers are loading or not and by default it is true
    const [content, setContent] = useState({});    // this is for storing the content of the trailer
    const [similarContent, setSimilarContent] = useState([]);    // this is for storing the similar content
    const {contentType} = useContentStore();    // this is for getting the content types from the store

    const sliderRef = useRef(null);    // this is for the slider reference


    // now we will try to get the trailers from the api by using the useEffect hook

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers);
            } catch (error) {
                if(error.message.includes("404")) {
                    setTrailers([]);
                }  
            }
        }
        getTrailers();
    }, [contentType, id]);   
    
    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilarContent(res.data.similar);
            } catch (error) {
                if(error.message.includes("404")) {
                    setSimilarContent([]);
                }  
            }
        }
        getSimilarContent();
    }, [contentType, id]);  

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(res.data.content);
            } 
            catch (error) {
                if(error.message.includes("404")) {
                    setContent(null);
                }
            }
            finally {
                setLoading(false);
            }  
        }
        getContentDetails();
    }, [contentType, id]);  

    // these are the functions to handle the next and the previous buttons

    const handleNext = () => {
        if(currentTrailerIdx < trailers.length - 1)    // what it means if the current trailer is not the last one then you can press the next button
            setCurrentTrailerIdx(currentTrailerIdx + 1);    // and then set the current trailer index to the next one
    }
    const handlePrev = () => {
        if(currentTrailerIdx > 0)                       // if the current trailer is not the first one then you can press the previous button
        setCurrentTrailerIdx(currentTrailerIdx - 1);    // and then set the current trailer index to the previous one
    }

    const scrollLeft = () => {
        if(sliderRef.current) {
           sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior: "smooth"}); 
        }
    }
    const scrollRight = () => {
        if(sliderRef.current) {
           sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior: "smooth"}); 
        }
    }

    if(loading) return (
        <div className="min-h-screen bg-black p-10">
            <WatchPageSkeleton/>
        </div>
    )

    if(!content) {
        return(
            <div className="bg-black text-white h-screen">
                <div className="max-w-6xl mx-auto">
                    <Navbar/>
                    <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                        <h2 className="text-2xl sm:text-5xl font-bold text-balance">Content not found 😥</h2>
                    </div>
                </div>
            </div>
        )
    }

    // the above content was all about the fetching of the trailers and the similar content and the content details now i will create the UI for the watch page.

  return (
    <div className="bg-black min-h-screen text-white">
        <div className="mx-auto container px-4 py-8 h-full">
            <Navbar/>

            {trailers.length > 0 && (
                // this div is going to hold off our buttons.
                <div className="flex justify-between items-center mb-4">
                    <button 
                        className={`
                            bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${currentTrailerIdx === 0 ? "cursor-not-allowed opacity-35" : ""}
                        `}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24}/>
                    </button>

                    <button className={`
                            bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        disabled={currentTrailerIdx === trailers.length - 1}   // if the trailer is the last one then disable the button
                        onClick={handleNext}
                    >
                        <ChevronRight size={24}/>
                    </button>
                </div>
            )}

            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
                {trailers.length > 0 && (
                    <ReactPlayer 
                        controls={true}
                        width={"100%"}
                        height={"70vh"}
                        className="mx-auto overflow-hidden rounded-lg"
                        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}    // key will be the id of the trailer from YouTube
                    />
                )}
                
                {/* if no trailer are available then we will say that no trailer is available */}
                {trailers?.length === 0 && (
                    <h2 className="text-xl text-center mt-5">
                        No trailers available for {" "}
                        <span className="font-bold text-red-600">{content?.title || content?.name}</span> 😥
                    </h2>
                )}
            </div>

            {/* // here we will show the movie details */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-5xl font-bold text-balance">{content?.title || content?.name}</h2>
                    <p className="mt-2 text-lg">
                        {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}  {/* here we are using the formatReleaseDate function to format the date this is the utility function we're only going to use it in this file  */}
                        {content?.adult ? (
                            <span className="text-red-600">18+</span>
                        ) : (
                            <span className="text-green-600">PG-13</span>
                        )}{" "}
                    </p>
                    <p className="mt-4 text-lg">{content?.overview}</p>
                </div>
                <img src={ORIGINAL_IMG_BASE_URL + content.poster_path} alt="Poster image" className="max-h-[600px] rounded-md"/>
            </div>

            {/* // this is the div for the similar content */}

            {similarContent.length > 0 && (
                <div className="mt-12 max-w-5xl mx-auto relative">
                    <h3 className="text-3xl font-bold mb-4">
                        Similar Movies/TV Shows
                    </h3>

                    <div className="flex overflow-x-scroll hide-scrollbar gap-4 pb-4 group" ref={sliderRef}>
                        {similarContent.map((content) => {
                            if(content.poster_path === null) return null;
                            return (
                                <Link key={content.id} to={`/watch/${content.id}`} 
                                    className="w-52 flex-none"
                                >
                                    <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="Poster Path" className="w-full h-auto rounded-md"/>
                                    <h4 className="mt-2 text-lg font-semibold">
                                        {content.title || content.name}
                                    </h4>
                                </Link>
                            )
                        })}

                        <ChevronRight
                            className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            onClick={scrollRight}
                        />
                        <ChevronLeft
                            className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                            onClick={scrollLeft}
                        />
                    </div>
                </div>
            )}

        </div>
    </div>
  )
}

export default WatchPage