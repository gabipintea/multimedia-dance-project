var context = new AudioContext();
var ofilter = context.createBiquadFilter()
ofilter.type = "lowpass"
ofilter.frequency.value = 8000;
window.ofilter = ofilter;

var gain = context.createGain();
gain.gain.setValueAtTime(0,0)

window.midiArray = [];

var attack = 0.1,
release = 0.1;

var mousedownID = -1

const rnJesus  = (mod) => {
    return Math.random() * mod
}
const getFreq = (note) => {
    return (Math.pow(2, (note-69)/12)*440).toFixed(2);
}

const handleMIDI = (msg) => {
    var md  = window.midiArray
    console.log(md)


    if (md.length === 0)
    {
        md.unshift(msg);
    }

    if(!md.find(x => x[1] === msg[1])) {
            window.midiArray.unshift(msg);
     }
    else {
        md.find(x => x[1] === msg[1])[0] = msg[0];       
    }

    if (md[0][0] == 144)
    {
        // if (md.length > 1)
        // {disconnectChain()}
        connectChain(getFreq(md[0][1]));
    }
    else {
        md.splice(md.findIndex(x => x[1] === msg[1] && x[0] === 128), 1)
        if (md.length && md[0] !== 128)
            handleMIDI(md[0])
        else {
            disconnectChain()
            md = [];
        }
    }
}

const initOsc = () => {
    const osc = context.createOscillator()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(440, context.currentTime);
    osc.start();
    window.osc = osc;
    window.osc.connect(gain).connect(window.ofilter).connect(context.destination);
}

const connectChain = (freq) => {
    gain.gain.cancelScheduledValues(context.currentTime)
    osc.frequency.setValueAtTime(freq, context.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, context.currentTime)
    gain.gain.linearRampToValueAtTime(0.5, context.currentTime + attack);
    //window.osc.connect(gain).connect(window.ofilter).connect(context.destination);
}

const disconnectChain = () => {
    gain.gain.cancelScheduledValues(context.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, context.currentTime)
    gain.gain.linearRampToValueAtTime(0, context.currentTime + release);
    // osc.disconnect()
    // gain.disconnect()
    // ofilter.disconnect()
}

const success = (access) => {
    var inputs =  access.inputs.values();
    var outputs = access.outputs.values();
    
    var prev = 0;

    const getMidi = (msg) => {

        let freq = getFreq(msg.data[1])  
        let osc = window.osc;
        //console.log(getFreq(msg.data[1]), osc.frequency.value);
       
        handleMIDI(msg.data);

    }

    for (let input of inputs)
    {
        input.onmidimessage = getMidi;
    }

    access.onstatechange = (e) => {
        console.log(e.port.name, e.port.manufacturer, e.port.state)
    }
}

const failure = () => {}

navigator.requestMIDIAccess().then(success, failure);

const handleFreqType = (type) => {
    window.ofilter.type = type;
}

const handleFreq = () =>  {
    window.ofilter.frequency.value = rnJesus(10000);
}

const handleWaveType = (type) => {
    window.osc.type = type;
}