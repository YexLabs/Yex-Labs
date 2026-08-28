/*
 * Fragment shader for the hero's dithered wave field.
 *
 * Perlin noise -> fbm -> wave pattern -> 8x8 Bayer ordered dither, ported
 * from the React Bits `Dither` background (reactbits.dev/backgrounds/dither,
 * MIT + Commons Clause, (c) David Haz). The GLSL is theirs; the surrounding
 * runtime is not.
 *
 * Ported rather than installed: that component needs three,
 * @react-three/fiber and postprocessing (672 kB raw / 166 kB gzipped), and
 * react-three-fiber v8 crashes under Next 15's app router because Next
 * vendors its own React and r3f reaches into ReactCurrentOwner, which that
 * copy does not expose.
 */

export const ditherFragmentShader = `precision highp float;

uniform vec2  resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3  waveColor;
uniform vec3  backgroundColor;
uniform float colorNum;
uniform float pixelSize;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}



/* Upstream indexes a const float[64] Bayer table. GLSL ES 1.00 forbids
   indexing an array with a non-constant expression, so under a plain WebGL1
   context that fails to compile with:
     '[]' : array index expression can only contain const or loop symbols
   three/postprocessing avoid it by compiling as GLSL ES 3.00 under WebGL2.
   Built recursively instead — bayer2 is the 2x2 ordered matrix and each level
   refines it, which reproduces the same 8x8 thresholds arithmetically. */
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  float threshold = bayer8(scaledCoord) - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void main() {
  /* Upstream renders the waves to a buffer and dithers in a second
     postprocessing pass. Fused into one pass here: quantise the pixel grid,
     evaluate the wave at the centre of each cell, then Bayer-dither the
     result. Same output, one draw call, no framebuffer. */
  vec2 pixel = pixelSize / resolution;
  vec2 snapped = pixel * (floor(gl_FragCoord.xy / resolution / pixel) + 0.5);

  vec2 uv = snapped;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;

  float f = pattern(uv);
  vec3 col = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));

  col = dither(snapped, col);
  gl_FragColor = vec4(col, 1.0);
}
`
