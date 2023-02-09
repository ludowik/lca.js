async function getMedia(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        const domElement = document.createElement('video');
        
        // required to work in iOS 11 & up:
        domElement.setAttribute('playsinline', '');

        try {
            if ('srcObject' in domElement) {
                domElement.srcObject = stream;
            } else {
                domElement.src = window.URL.createObjectURL(stream);
            }
        } catch (err) {
            domElement.src = stream;
        }

        document.body.appendChild(domElement);

        return stream;
    } catch (err) {
        /* handle the error */
    }
}

class WebCam extends Sketch {
    async setup() {
        this.stream = await getMedia({
            video: true,
            audio: false,
        });
    }

    draw() {
        if (this.stream)
            sprite(this.stream);
    }
}
