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
      elm.style.filter = "hue-rotate(" + rand * rand + "deg)";
      break;
    default:
      elm.style.filter = "";
      break;
  }
};

const initFilter = () => {
    var context = new AudioContext(),
      audioSource = context.createMediaElementSource(
        document.getElementById("music")
      ),
      filter = context.createBiquadFilter();
    audioSource.connect(filter);
  filter.type = "highpass";
  filter.frequency.value = 0;
  filter.gain.value = 0;
  window.filter = filter;
  window.filter.connect(context.destination);
};

const configFilter = (freq)=>  {
    window.filter.frequency.value =freq;
    window.filter.gain.value=freq/100;
    console.log(window.filter.frequency.value, window.filter.gain.value)
}

const clamp = (value) => {
    let min = 0,
    max = 15000,
    clamp = Math.min(Math.max(value,min),max)
    try
    {configFilter(clamp);}
    catch {
        
    }
}