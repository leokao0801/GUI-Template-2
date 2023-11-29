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

uniform sampler2D u_texBase;
// to here

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
    vec2 brickAmount = vec2(u_xBrickAmount, u_yBrickAmount);
    
    vec2 stAdjustedByBrickAmount = st * brickAmount;
    vec2 integerCoordinate = floor(stAdjustedByBrickAmount); // get the integer coords
    vec2 fractionalCoordinate = fract(stAdjustedByBrickAmount); // get the fractional coords
    vec2 mosaic = integerCoordinate / brickAmount;
    
    vec3 color = vec3(0.0);
    color = texture2D(u_texBase, mosaic).rgb;
    
    gl_FragColor = vec4(vec3(color), 1.0);
}
