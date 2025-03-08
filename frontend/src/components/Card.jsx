import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Icons from "./Icons";
import { Leetcodecalendar } from "react-leetcode-calendar";

const Card = ({ profile }) => {
    let [profile_data, setprofile_data] = useState({
        name: "Loading...",
        userAvatar: "https://fastly.picsum.photos/id/152/1000/1000.jpg?hmac=PROUM_wXGBei6hWzAx70AbTAJJOuTh5-aSwVQAycddw",
        profile: profile,
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
    async function fetchData() {
        console.log(
            "Fetching data for ",
            import.meta.env.VITE_BACKEND_URL + profile_data.profile
        );
        fetch(`${import.meta.env.VITE_BACKEND_URL}/${profile_data.profile}`)
            .then((res) => res.json())
            .then((data) => {
                setprofile_data(data);
                return data;
            })
            .then((data) => {
                data.submissionCalendar = data.submissionCalendar.map((ele) => {
                    return {
                        date: new Date(ele[0] * 1000)
                            .toISOString()
                            .split("T")[0],
                        count: ele[1],
                        level: ele[1] === 1 ? 1 : ele[1] <= 3 ? 2 : 3,
                    };
                });

                const lastYearDate = new Date();
                lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
                const dummyData = {
                    date: "2024-08-02",
                    count: 1,
                    level: 1,
                };
                data.submissionCalendar.push(dummyData);
                // sort the data
                data.submissionCalendar = data.submissionCalendar.sort(
                    (a, b) => {
                        return new Date(b.date) - new Date(a.date);
                    }
                );
                setprofile_data(data);
                console.log(data.submissionCalendar);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center bg-white border w-full border-gray-200 rounded-lg shadow-sm sm:flex-row dark:border-gray-700 dark:bg-gray-800 my-4">
            <img
                className="w-full rounded-t-lg h-96 sm:h-auto sm:w-48 sm:rounded-lg mx-4 min-w-48"
                src={profile_data.userAvatar}
                alt={profile_data.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {profile_data.name}
                    <a
                        href={"https://leetcode.com/" + profile_data.profile}
                        className="px-2 font-medium text-gray-700 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white animate"
                    >
                        ({profile_data.profile})
                    </a>
                </h5>

                <ul className="flex flex-wrap">
                    <li className="mr-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 font-medium text-white bg-gray-200 rounded dark:bg-gray-700 dark:text-white">
                            {Icons.Tag}
                            {profile_data.problems[0].count} All
                        </span>
                    </li>
                    <li className="mr-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 font-medium text-white bg-green-200 rounded dark:bg-green-700 dark:text-white">
                            {Icons.Tag}
                            {profile_data.problems[1].count} Easy
                        </span>
                    </li>
                    <li className="mr-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 font-medium text-white bg-orange-200 rounded dark:bg-orange-700 dark:text-white">
                            {Icons.Tag}
                            {profile_data.problems[2].count} Medium
                        </span>
                    </li>
                    <li className="mr-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 font-medium text-white bg-red-200 rounded dark:bg-red-700 dark:text-white">
                            {Icons.Tag}
                            {profile_data.problems[3].count} Hard
                        </span>
                    </li>
                </ul>
                <Leetcodecalendar
                    username={profile_data.profile}
                    graph={"yearly"}
                />
            </div>
        </div>
    );
};

export default Card;
