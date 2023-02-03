/**
 * 创建透明墙体材质
 * option =>
 * params height color opacity speed
 * **/
const createOpacityWallMat = ({
  height = 10,
  color = "#00ffff",
  opacity = 0.5,
  speed = 1,
}) => {
  // 顶点着色器
  const vertexShader = /* glsl */ `
      uniform vec3 u_color;

      uniform float time;
      uniform float u_height;
      varying float v_opacity;

      void main() {
          vec3 vPosition = position;
          v_opacity = mix(1.0, 0.0, position.y / u_height * 1.0) * (1.0 + sin(time) * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1);
      }
   `;
  // 片元着色器
  const fragmentShader = /* glsl */ `
      uniform vec3 u_color;
      uniform float u_opacity;
      varying float v_opacity;
      void main() {
          gl_FragColor = vec4(u_color, v_opacity * u_opacity);
      }
    `;

  return new THREE.ShaderMaterial({
    uniforms: {
      u_height: {
        value: height,
      },
      u_opacity: {
        value: opacity,
      },
      u_color: {
        value: new THREE.Color(color),
      },
      time: {
        value: 0,
      },
      speed: {
        value: speed,
      },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
};
