#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// Part 2 - Step 1
// from here
uniform float u_xBrickAmount;
uniform float u_yBrickAmount;
// to here

uniform sampler2D u_texBase;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    //st.x *= u_resolution.x / u_resolution.y;
    
    // float paraX = (sin(u_time * 0.1) * 0.5 + 0.5) * 45.0;
    // float paraY = (cos(u_time * 0.05) * 0.5 + 0.5) * 125.0;
    // vec2 brickSize = vec2(paraX + 5.0, paraY + 3.0) ; // n_mouse * 60.0
    
    vec2 brickAmount = vec2(u_xBrickAmount, u_yBrickAmount);
    
    vec2 stAdjustedByBrickAmount = st * brickAmount;
    vec2 integerCoordinate = floor(stAdjustedByBrickAmount); // get the integer coords
    vec2 fractionalCoordinate = fract(stAdjustedByBrickAmount); // get the fractional coords
    vec2 mosaic = integerCoordinate / brickAmount;
    
    vec3 color = vec3(0.0);
    color = texture2D(u_texBase, mosaic).rgb;
    
    gl_FragColor = vec4(vec3(color), 1.0);
}
