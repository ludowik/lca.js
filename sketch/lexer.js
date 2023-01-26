class Lexer extends Sketch {
    setup() {
        this.tokens = [];
        fetch("sketches.js/lexer.js")
            .then(response => response.text())
            .then(txt => {
                this.tokens = this.tokenize(txt);
            });
    }

    tokenize(txt) {
        let keywords = [
            /^\".*\"/,
            /^\'.*\'/,
            /^\d*\.\d*/,
            /^\w+/,
            /^function/,
            /^end/,
            '^\r',
            '^\n',
            '^ ',
            '^.'];

        let tokens = [];
        while (txt.length > 0) {
            let length = txt.length;
            for (const keyword of keywords) {
                let k = txt.match(keyword);
                if (k) {
                    if (k[0] !== ' ' && k[0] !== '\n')
                        tokens.push(k);
                    txt = txt.slice(k[0].length);
                    break;
                }
            }
            if (length === txt.length) {
                console.log('inconsistent lexer');
                break;
            }
        }
        return tokens;
    }

    draw() {
        background(colors.white);

        fill(colors.black);
        fontSize(minSizeFont);

        textMode(CORNER);

        let x = 0, y = 0;
        for (const token of this.tokens) {
            text(token, x, y);
            y += 20;
        }
    }
}
