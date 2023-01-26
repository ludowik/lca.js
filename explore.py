import os
import re

with open('src/loadFiles.js', 'wt') as f:
    sketchFiles = f'let sketchFiles = [\n'
    sketchDeclarations = f'let sketchDeclarations = [\n'

    for root, dirs, files in os.walk("./sketch"):
        for file in files:
            if not file.endswith(".js"):
                continue

            sketchFiles += f'   "{root + "/" + file}",\n'.replace('\\', '/').replace('./', '')
            with open(os.path.join(root, file), 'rt') as src:
                sketchs = re.findall('class (\w*) extends Sketch', src.read())
                for sketch in sketchs:
                    sketchDeclarations += f'    "{sketch}",\n'


    sketchFiles += f'];\n'
    sketchDeclarations += f'];\n'

    f.write(sketchFiles)
    f.write(sketchDeclarations)
    