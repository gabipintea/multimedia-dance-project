navigator.requestMIDIAccess().then((access) => {
    // const inputs =  access.input.values();
    // const outputs = access.outputs.values();

    access.onstatechange = (e) => {
        console.log(e.port.name)
    }
})