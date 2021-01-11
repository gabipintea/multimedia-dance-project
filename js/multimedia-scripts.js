const handleEffect = (fx, id = "vodaVid") => {
    
    let elm = document.getElementById(id);
    let rand = Math.random() * 100;
    switch (fx) {
        case "blur":
            elm.style.filter = "blur(" + rand + "px)";
            break;
        case "contrast":
            elm.style.filter = "contrast(" + rand + "%)";
            break;
        case "hue":
            elm.style.filter = "hue-rotate(" + rand*rand + "deg)";
            break;
        default:
            elm.style.filter = "";
            break;
    }
}
