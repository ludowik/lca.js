import os
import re

with open('files', 'wt') as f:
    sketchFiles = f'let sketchFiles = [\n'
    sketchDeclaration = f'\n'

    for root, dirs, files in os.walk("./sketch"):
        for file in files:
            if file.endswith(".js"):
                sketchFiles += f'  "{file}",\n'
                with open(os.path.join(root, file), 'rt') as src:
                    sketchs = re.findall('class (\w*) extends Sketch', src.read())
                    for sketch in sketchs:
                        sketchDeclaration += f'declareSketch({sketch});\n'

    sketchFiles += f'];\n'

    f.write(sketchFiles)
    f.write(sketchDeclaration)
    