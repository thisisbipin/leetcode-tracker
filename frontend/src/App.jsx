import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
    let [PROFILES, setPROFILES] = useState([]);
    useEffect(() => {
        window.livetimer = 60000;
    }, []);
    useEffect(() => {
        try {
            let urlParams = window.location.search;
            let getQuery = urlParams.split("?")[1];
            let params = getQuery.split("&");

            setPROFILES(params);
        } catch (error) {
            console.log("URL not passed");
        }
    }, []);

    return (
        <>
            <section className="bg-gray-900 h-full text-white">
                <div className="container mx-auto p-4">
                    <div className="text-center m-4" id="pageHeaderTitle">
                        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                Leetcode Tracker
                            </span>
                        </h1>
                        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                            Stalk your friend's leetcode progress with ease{" "}
                            <span className="md:hidden">
                                <br />
                            </span>
                            ༼ つ◕◡◕ ༽つ
                        </p>
                    </div>

                    {PROFILES.length > 0 ? (
                        PROFILES.map((ele) => {
                            return <Card key={ele} profile={ele} />;
                        })
                    ) : (
                        <div className="alert font-mono" role="alert">
                            Usage: [-url] [-username1] & [-username2] & ...
                            <br />
                            <span className="ml-10"></span>
                            add the leetcode usernames into the url bar with '&'
                            as a separator. <br />
                            <br />
                            For eg:
                            <br />
                            <span className="ml-10"></span>
                            <i className="fa-solid fa-arrow-right"></i>{" "}
                            <span className="text-yellow-500">
                                https://flower-plant-gorilla.glitch.me/?
                            </span>
                            <span className="text-lime-500">neal_wu</span>
                            <span className="text-red-500">&</span>
                            <span className="text-lime-500">arignote</span>{" "}
                            <br />
                            <span className="ml-10"></span>
                            The above url will display the stats of the User
                            with user handle{" "}
                            <span className="text-lime-500">
                                neal_wu
                            </span> and{" "}
                            <span className="text-lime-500">arignote</span>
                        </div>
                    )}
                </div>
                <footer className="text-center text-gray-500 dark:text-gray-400 p-4">
                    Made with ❤️ by{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        @ə'sassin
                    </a>
                </footer>
            </section>
        </>
    );
}

export default App;
