import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/Card.css";
import "./css/GraphColor.css";

export default function Card(props) {
    let [profile_data, setprofile_data] = useState({
        name: "Loading...",
        userAvatar: "https://picsum.photos/1000/1000",
        profile: props.profile,
        latest: ["", 1],
        allQuestionsCount: [
            { difficulty: "All", count: 0 },
            { difficulty: "Easy", count: 0 },
            { difficulty: "Medium", count: 0 },
            { difficulty: "Hard", count: 0 },
        ],
        submissionCalendar: [],
        problems: [
            { difficulty: "All", count: 0, submissions: 0 },
            { difficulty: "Easy", count: 0, submissions: 0 },
            { difficulty: "Medium", count: 0, submissions: 0 },
            { difficulty: "Hard", count: 0, submissions: 0 },
        ],
    });

    useEffect(() => {
        fetch(
            "https://shocking-sugary-handball.glitch.me/track/" +
                profile_data.profile
        )
            .then((res) => res.json())
            .then((data) => {
                setprofile_data(data);
            });
    }, []);

    let link_to_ptofile = "https://leetcode.com/" + profile_data.profile;
    return (
        <article className="postcard dark blue">
            <a
                target="_blank"
                rel="noreferrer"
                className="postcard__img_link"
                href={link_to_ptofile}
            >
                <img
                    className="postcard__img"
                    src={profile_data.userAvatar}
                    alt="User Profile"
                />
            </a>
            <div className="postcard__text">
                <h1 className="postcard__title blue">
                    <a target="_blank" rel="noreferrer" href={link_to_ptofile}>
                        {profile_data.name}
                    </a>
                    <div
                        className="postcard__subtitle small"
                        style={{ color: "#AAAAAA" }}
                    >
                        ({profile_data.profile})
                    </div>
                </h1>
                <div className="postcard__subtitle small">
                    Max. Rating: null
                </div>
                <div className="postcard__bar"></div>
                <div className="postcard__preview-txt">
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "90%",
                            maxWidth: "50vw",
                        }}
                    >
                        {profile_data.submissionCalendar.map((ele) =>
                            getGraph(ele)
                        )}
                    </div>
                </div>
                <ul className="postcard__tagbox">
                    <li className="tag__item">
                        <i className="fas fa-tag mr-2">
                            {" "}
                            {profile_data.problems[0].count}
                        </i>{" "}
                        <span>All</span>
                    </li>
                    <li className="tag__item">
                        <i className="fas fa-tag mr-2">
                            {" "}
                            {profile_data.problems[1].count}
                        </i>{" "}
                        <span style={{ color: "lightgreen" }}>Easy</span>
                    </li>
                    <li className="tag__item">
                        <i className="fas fa-tag mr-2 ">
                            {" "}
                            {profile_data.problems[2].count}
                        </i>{" "}
                        <span style={{ color: "orange" }}>Medium</span>
                    </li>
                    <li className="tag__item play blue">
                        <i className="fas fa-tag mr-2">
                            {" "}
                            {profile_data.problems[3].count}
                        </i>{" "}
                        <span style={{ color: "red" }}>Hard</span>
                    </li>
                </ul>
            </div>
        </article>
    );
}

function getGraph(value = []) {
    let star = "1";
    let boxclass = "box c";
    if (value[1] >= 4) star = "4";
    else if (value[1] === 3) star = "3";
    else if (value[1] === 2) star = "2";
    let date = new Date(value[0] * 1000);
    let tooltip =
        value[1] +
        " submissions on " +
        date.getDate() +
        "/" +
        date.getMonth() +
        "/" +
        date.getFullYear();

    boxclass += star;
    if (date.getDay() === 0) boxclass += " blink_me";
    return (
        <div
            key={value[0]}
            className={boxclass}
            data-toggle="tooltip"
            data-placement="bottom"
            title={tooltip}
        ></div>
    );
}
