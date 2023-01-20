class ImageSketch extends Sketch {
    preload() {
        this.images = [];

        this.images.sog = loadImage('assets/logo/sogfroffttphp.jpg');
        this.images.sogearly = loadImage('assets/logo/sogfroffttdmphp.jpg');

        this.images.origin = loadImage('assets/logo/origin.png');
        this.images.sizing = loadImage('assets/logo/sizing pharma.png');

        noLoop();
    }

    setup(config) {
        config.w = 2 * this.images.sog.width;
        config.h = 2 * this.images.sog.height;

        this.images.img = createGraphics(this.images.sog.width, this.images.sog.height);
    }

    make(name, img, logo, x, y) {
        this.images.img.background(colors.transparent);
        this.images.img.blendMode(BLEND);
        this.images.img.imageMode(CORNER);
        this.images.img.image(img, 0, 0);
        if (logo !== null) {
            this.images.img.imageMode(CENTER);
            this.images.img.image(logo, 90, 90, 120, 120);
        }

        image(this.images.img,
            x * this.images.img.width,
            y * this.images.img.height,
            0.65 * this.images.img.width,
            0.65 * this.images.img.height);

        this.images.img.save(name);
    }

    render() {
        background(colors.black);

        this.make('sogfroffttphp', this.images.sog, null, 0, 0);
        this.make('sogfroffttdmphp', this.images.sogearly, null, 0, 0);

        this.make('sogfroffttphp_origin', this.images.sog, this.images.origin, 0, 0);
        this.make('sogfroffttphp_sizing', this.images.sog, this.images.sizing, 1, 0);
        this.make('sogfroffttdmphp_origin', this.images.sogearly, this.images.origin, 0, 1);
        this.make('sogfroffttdmphp_sizing', this.images.sogearly, this.images.sizing, 1, 1);
    }
}

declareSketch(ImageSketch);
