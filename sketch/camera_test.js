async function getMedia(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        const video = document.createElement('video');

        // required to work in iOS 11 & up:
        video.setAttribute('playsinline', '');

        try {
            if ('srcObject' in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
        } catch (err) {
            video.src = stream;
        }

        //document.body.appendChild(video);

        video.play();

        return video;
    } catch (err) {
        /* handle the error */
    }
}

class WebCam extends Sketch {
    async setup() {
        this.video = await getMedia({
            video: true,
            audio: false,
        });

        this.img = new FrameBuffer(100, 100);
    }

    draw() {
        if (this.video) {
            this.img.updateTexture(this.video);
            sprite(this.img);
        }
    }
}
