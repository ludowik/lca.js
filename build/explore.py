import os
import re

with open('./src/loadFiles.js', 'wt') as f:
    sketchFilesJS = f'let sketchFiles = [\n'
    sketchFilesLua = f'let sketchFilesLua = [\n'
    sketchDeclarations = f'let sketchDeclarations = [\n'

    for root, dirs, files in os.walk("./sketch"):
        for file in files:
            if not file.endswith(".js"):
                continue

            sketchFilesJS += f'   "{root + "/" + file}",\n'.replace('\\', '/').replace('./', '')
            with open(os.path.join(root, file), 'rt') as src:
                sketchs = re.findall('class (\w*) extends Sketch', src.read())
                for sketch in sketchs:
                    sketchDeclarations += f'    "{sketch}",\n'


    for root, dirs, files in os.walk("../lca/apps/creative_coding"):
        for file in files:
            if not file.endswith(".lua"):
                continue

            sketchFilesLua += f'   "{root + "/" + file}",\n'.replace('\\', '/')


    sketchFilesJS += f'];\n\n'
    sketchFilesLua += f'];\n\n'
    sketchDeclarations += f'];\n'

    f.write(sketchFilesJS)
    f.write(sketchFilesLua)
    f.write(sketchDeclarations)
    