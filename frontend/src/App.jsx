import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
    let [PROFILES, setPROFILES] = useState([]);
    let [count, setcount] = useState(0);
    let [spinner_enable, setspinner_enable] = useState(true);
    let livetimer;
    useEffect(() => {
        window.livetimer = 60000;
    }, []);
    useEffect(() => {
        try {
            let urlParams = window.location.search;
            let getQuery = urlParams.split("?")[1];
            let params = getQuery.split("&");

            setPROFILES(params);
            console.log("Refreshed :", count);
        } catch (error) {
            console.log("URL not passed");
        }
        if (spinner_enable === true)
            livetimer = setTimeout(() => {
                setcount(count + 1);
                setPROFILES([]);
            }, window.livetimer);
    }, [count]);

    return (
        <>
            <section className="dark">
                <div className="container py-4">
                    <h1 className="h1 text-center" id="pageHeaderTitle">
                        LeetCode Tracker v2.0
                    </h1>
                    <span
                        style={{
                            position: "absolute",
                            zIndex: "2",
                            left: "10px",
                            top: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: spinner_enable ? "red" : "grey",
                            margin: "4px",
                            padding: "4px",
                            border:
                                "1px solid " +
                                (spinner_enable ? "red" : "grey"),
                            borderRadius: "5px",
                            width: "52px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (spinner_enable === true) {
                                clearTimeout(livetimer);
                            } else
                                livetimer = setTimeout(() => {
                                    setcount(count + 1);
                                    setPROFILES([]);
                                }, window.livetimer);
                            setspinner_enable(!spinner_enable);
                        }}
                    >
                        Live
                        <div
                            className={
                                spinner_enable ? "spinner-grow text-danger" : ""
                            }
                            style={{ height: "10px", width: "10px" }}
                            role="status"
                        ></div>
                    </span>
                    {PROFILES.length > 0 ? (
                        PROFILES.map((ele) => {
                            return <Card key={ele} profile={ele} />;
                        })
                    ) : (
                        <div
                            className="alert"
                            style={{ fontFamily: "monospace" }}
                            role="alert"
                        >
                            Usage: [-url] [-username1] & [-username2] & ...
                            <br />
                            <span
                                style={{
                                    display: "inline-block",
                                    marginLeft: "40px",
                                }}
                            ></span>
                            add the leetcode usernames into the url bar with '&'
                            as a seperator. <br />
                            <br />
                            For eg:
                            <br />
                            <span
                                style={{
                                    display: "inline-block",
                                    marginLeft: "40px",
                                }}
                            ></span>
                            <i className="fa-solid fa-arrow-right"></i>{" "}
                            <span style={{ color: "yellow" }}>
                                https://shocking-sugary-handball.glitch.me/
                            </span>
                            <span style={{ color: "lime" }}>neal_wu</span>
                            <span style={{ color: "red" }}>&</span>
                            <span style={{ color: "lime" }}>arignote</span>{" "}
                            <br />
                            <span
                                style={{
                                    display: "inline-block",
                                    marginLeft: "40px",
                                }}
                            ></span>
                            The above url will display the stats of the User
                            with user handle{" "}
                            <span style={{ color: "lime" }}>neal_wu</span> and{" "}
                            <span style={{ color: "lime" }}>arignote</span>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default App;
