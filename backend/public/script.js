let table = document.getElementById("table");

let refresh;
let makerow = (counter, name, profile, submissioncount) => {
    let row = document.createElement("tr");
    row.setAttribute("scope", "row");

    let count = document.createElement("td");
    count.textContent = counter;

    let profileBox = document.createElement("td");
    if (profile === "mandar2411") profileBox.className = "col text-danger";
    else profileBox.className = "col text-success";
    profileBox.textContent = profile.slice(0, 17);

    let nameBox = document.createElement("td");
    nameBox.className = "col text-secondary";
    nameBox.textContent = name.slice(0, 17);

    let submissionCountBox = document.createElement("td");
    submissionCountBox.className = "col text-secondary";
    submissionCountBox.textContent = submissioncount;

    row.appendChild(count);
    row.appendChild(submissionCountBox);
    row.appendChild(nameBox);
    row.appendChild(profileBox);
    return row;
};

function startTracking() {
    $("#lc-spinner").addClass("spinner-border");
    $("#lc-track-button").prop("disabled", true);
    $("#lc-auto-refresh").prop("disabled", true);
    table.innerHTML =
        '<thead> \
        <th class="col">#</th>\
        <th class="col">Count</th>\
        <th class="col">Name</th>\
        <th class="col">Handle</th>\
        </thead>';
    let counter = 0;
    PROFILES.map(async (ele) => {
        const URL = "https://flower-plant-gorilla.glitch.me/track/" + ele;
        try {
            let res = await fetch(URL);
            let json = await res.json();
            // console.log(json);
            let { name, profile, latest } = json;
            table.appendChild(makerow(++counter, name, profile, latest[1]));
        } catch (err) {
            table.innerHTML = err.message;
        }
    });
    setInterval(() => {
        $("#lc-spinner").removeClass("spinner-border");
        $("#lc-track-button").prop("disabled", false);
        $("#lc-auto-refresh").prop("disabled", false);
    }, 5000);
}

$("#lc-track-button").on("click", () => startTracking());

$("#lc-auto-refresh").change(() => {
    if ($("#lc-auto-refresh").prop("checked") == true) {
        console.log("started");
        $("#lc-auto-refresh-text").text("(auto refresh is on)");
        refresh = setInterval(() => {
            startTracking();
        }, 60000);
        startTracking();
    } else {
        clearInterval(refresh);
        $("#lc-auto-refresh-text").text("(auto refresh is off)");
        console.log("stopped");
    }
});

$("#lc-auto-refresh").click();
