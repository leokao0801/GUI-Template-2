If you want to add your own GUI compoment to change variables in fragment shder dynamically, this documentation is for you!

The structure of this template is p5.js and different from teacher's template, so we need to modify some file.

The step-by-step tutorial below contains two part:
Part 1: Changing File Structue from Teacher's Template to p5.js
Part 2: Adding GUI Component
And...if you don't want to understand all the detail is totally fine, you can just skip Part 1 and start from Part 2.

// -------------------------------------------------- //

Part 1: Changing File Structue from Teacher's Template to p5.js

Fist of all, we need to understand the difference between teacher's template and p5.js.
In teacher's template, .frag is called in .html directely, while p5.js is doing it by aother way.
The structure of p5.js is just like a web, that means we need not only .html but also .js and .css.
After building a p5.js structure, we got to include some libraries while calling .js and .css in .html.
Now, .frag is no more needed in .html, instead, the shader is created by loading .frag and vert.glsl in a canvas created in .js.

Most of steps in Part 1 is done in example file.
You can see the content below as a code explanation, and when there is a "!MODIFY!" text in the step, it means you nedd to modify the code by your own.

Step 1: Create .js and .css

Step 2: index.html <head>
        2.1 Include Library: Add Code Below

            <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.9/dat.gui.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.js"></script>

        2.2 Call .js and .css : Add Code Below

            !MODIFY!

            <script src="fileLocation/fileName.js"></script>
	    <link rel="stylesheet" type="text/css" href="fileLocation/fileName.css">
        
        index.html <body>
        2.3 Remove Code Below

            <canvas id="glslCanvas" data-fragment-url="1101.frag" width="800" height="600" data-textures="data/moon.jpg, data/MonaLisa.jpg"></canvas>

Step 3: Create vert.glsl (co-building the shader with .frag)

Step 4: Load vert.glsl and .frag in the Canvas Created in .js to Create Shader

        !MODIFY!

        (There is a lot of steps needed to make this happen, but the code you only have to care and modify is below.)

        function preload(){
	        theShader = loadShader('fileLocation/vert.glsl', 'fileLocation/fileName.frag');
        }

// -------------------------------------------------- //

Part 2: Adding GUI Component

Part 2 contains two stages:
1. Dynimically chaging variebles through GUI component.
2. Passing variables value from .js to .frag.

When there is a "!MODIFY!" text in the step, it means you nedd to modify the code by your own.

Step 1: .frag
        Set Variable: Add Code Below

        !MODIFY!

        uniform variableFormat u_variableName01;
        uniform variableFormat u_variableName02;

        (recommed variable naming way: u_something)

Step 2: .js
        2.1 Set Variable: Add Code Below

            !MODIFY!

            let componentName = {
                variable01Name: value01,
                variable02Name: value02,
                ...
            }

        2.2 Set GUI: Add Code Below

            !MODIFY!

            window.onload = function() {
                var gui = new dat.GUI();
                gui.domElement.id = 'gui';
                gui.add(componentName, 'variable01Name', lowerBound, upperBound).name("GUI01Name");

                let folderName = gui.addFolder("GUIFolderName");
                folderName.addColor(componentName, 'variable02Name').name("GUI02Name");
                ...
            };

            (dat.GUI API: https://github.com/dataarts/dat.gui/blob/master/API.md)

        2.3 Pass Variables: Add Code Below

            !MODIFY!

            theShader.setUniform("u_variableName01", componentName.variable01Name);

And now you can use u_variableName01 in .frag!
