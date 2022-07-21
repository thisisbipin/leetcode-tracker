import { LeetCode } from "leetcode-query";
const leetcode = new LeetCode();

function getLatestSubmissionCount(__date_data) {
    let x;
    for (let each_key in __date_data) x = [each_key, __date_data[each_key]];
    return x;
}
function get_20_latest_date_data(__date_data) {
    let res = [];
    for (let each_key in __date_data) {
        res.push([each_key, __date_data[each_key]]);
    }
    return res.slice(-20);
}
const NOT_FOUND = {
    name: "404 NOT FOUND",
    userAvatar: "https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png",
    profile: "",
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
};
async function getDataOfUser(profile) {
    const data = await leetcode.get_user(profile);

    if (data.matchedUser != null) {
        let date_data = await JSON.parse(data.matchedUser.submissionCalendar);
        return {
            name: data.matchedUser.profile.realName,
            userAvatar: data.matchedUser.profile.userAvatar,
            profile: profile,
            latest: getLatestSubmissionCount(date_data),
            allQuestionsCount: data.allQuestionsCount,
            submissionCalendar: get_20_latest_date_data(date_data),
            problems: data.matchedUser.submitStats.acSubmissionNum,
        };
    } else {
        // console.log({ ...NOT_FOUND, profile: profile });
        return { ...NOT_FOUND, profile: profile };
    }
}
export default getDataOfUser;
