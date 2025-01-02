let meiyuinfo, nowItem, meiyu, options;

function next (ua) {
    if (["A", "B", "C", "D"].includes(ua)) {
        if (ua === nowItem["answer"]) {
            M.toast({html: "Correct!"});
            next();
        } else {
            M.toast({
                html: "Incorrect! Answer: " + nowItem["options"][{
                    "A": 0,
                    "B": 1,
                    "C": 2,
                    "D": 3
                }[nowItem['answer']]]
            });
        }
    } else {
        renewItem();
    }
}

function renewItem () {
    const i = Math.floor(Math.random() * meiyu.length);
    nowItem = meiyu[i];
    meiyuinfo.innerText = `${i+1}. `+nowItem["question"];
    options[0].innerText = "A." + nowItem["options"][0].toString();
    options[1].innerText = "B." + nowItem["options"][1].toString();
    options[2].innerText = "C." + nowItem["options"][2].toString();
    options[3].innerText = "D." + nowItem["options"][3].toString();
}

window.onload = function () {
    meiyuinfo = document.getElementById("meiyuinfo");
    options = $(".option");

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        meiyu = JSON.parse(xhr.responseText);
        renewItem();
    }
    xhr.open("GET", "./meiyu.json");
    xhr.send();

    M.toast({html: "（可以用数字键盘作答）"});
};

addEventListener("keypress", function (event) {
    switch (event.key) {
        case "1": options[0].click(); break;
        case "2": options[1].click(); break;
        case "3": options[2].click(); break;
        case "4": options[3].click(); break;
    }
})