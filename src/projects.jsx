import React, { useRef, useEffect, useState } from 'react';
const projects = [
    {
      title: 'FlavourRhythm',
      image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGpjdGNEZ61ZQ/profile-treasury-image-shrink_160_160/B4DZbKBocRG0Ak-/0/1747146148310?e=1749808800&v=beta&t=dinTyYlFT1FlBoV9QghUWP4wbmirwEvtCyz6et_xA4g',
      link : 'https://backend-flavourrthym.onrender.com/'
    },
    {
      title: 'Orwar custom protocol', 
      image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGXmGqx7giqWg/profile-treasury-image-shrink_160_160/B4DZbKCIXmGwAk-/0/1747146278997?e=1749808800&v=beta&t=Ekcl16A6kDrogeia7ZRwv-60XdndfUszerJtl-63a0s',
      link : '/cn.pdf'
    },
    {
      title: 'Stock Market prediction',
      image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFX0RH6Wlkg7w/profile-treasury-image-shrink_160_160/B4DZbKBJ8_G4As-/0/1747146023605?e=1749808800&v=beta&t=51IR8bk2bTxC7T0EC4L_z5GjCUu0hwDtj8e7I4xcJUE', 
      link : '/cloud.pdf'
    },
    {
      title: 'Docker and kubernetes orchestration',
      image: 'https://media.licdn.com/dms/image/v2/D562DAQEgwTHBv3jOow/profile-treasury-image-shrink_160_160/profile-treasury-image-shrink_160_160/0/1730806514761?e=1749808800&v=beta&t=PKQ9Qe4_j_GG57MJCCDqEQgVVbQJwwgrdJsjXX7v8j8', 
      link: 'https://media.licdn.com/dms/image/v2/D562DAQEgwTHBv3jOow/profile-treasury-image-shrink_160_160/profile-treasury-image-shrink_160_160/0/1730806514761?e=1749808800&v=beta&t=PKQ9Qe4_j_GG57MJCCDqEQgVVbQJwwgrdJsjXX7v8j8', 
    },
    {
      title: 'Github user analytics',
      image: 'https://avatars.githubusercontent.com/u/201361405?v=4', 
      link : 'https://github.com/Harini-win/stockholm-github-users'
    },
    {
      title: 'IOT based smart garbage system',
      image: 'https://media.licdn.com/dms/image/v2/D562DAQFkLadpvqcMQg/profile-treasury-image-shrink_160_160/profile-treasury-image-shrink_160_160/0/1712216129667?e=1749808800&v=beta&t=lktzbMiDEGNKe4ypiUEIujAATrXvWOq0FoE6XWejJkE',
      link : 'https://media.licdn.com/dms/image/v2/D562DAQFkLadpvqcMQg/profile-treasury-image-shrink_160_160/profile-treasury-image-shrink_160_160/0/1712216129667?e=1749808800&v=beta&t=lktzbMiDEGNKe4ypiUEIujAATrXvWOq0FoE6XWejJkE'
    }
  ];
  const VioletDrippingEffect = ({ canvasRef, sectionRef }) => {
  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    
    const params = {
      colWidth: 0.6,
      speed: 0.15,
      scale: 0.3,
      seed: 0.42,
      color: [0.54, 0.17, 0.89] // Beautiful violet color
    };

    const vertexShaderSource = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;

      void main() {
          vUv = a_position;
          gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_col_width;
      uniform float u_seed;
      uniform float u_scale;
      uniform float u_time;
      uniform float u_speed;
      uniform vec3 u_color;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
      }

      float get_l(vec2 v) {
          return 1. - clamp(0., 1., length(v));
      }

      float rand(float n) {
          return fract(sin(n) * 43758.5453123);
      }

      void main() {
          float scale = .001 * u_scale;
          float speed = .001 * u_speed;

          vec2 uv = vUv;
          uv.x *= (scale * u_resolution.x);

          vec2 noise_uv = uv;
          noise_uv *= 5.;
          noise_uv.y *= (.25 * scale * u_resolution.y);
          noise_uv += vec2(0., u_time * 1.5 * speed);
          float shape = 0.;
          shape += snoise(noise_uv);
          shape = clamp(.5 + .5 * shape, 0., 1.);
          shape *= pow(.5 * uv.y + .7, 8.);
          shape = clamp(shape, 0., 1.);

          float dots = 0.;
          float bars = 0.;
          float light = 0.;

          const int num_col = 12;
          for (int i = 0; i < num_col; i++) {
              vec2 col_uv = vUv;

              float start_time_offset = rand(100. * (float(i) + u_seed));
              float c_t = fract(u_time * speed + start_time_offset);
              float drop_time = .3 + .5 * rand(10. * (float(i) + u_seed));

              float before_drop_normal = c_t / drop_time;
              float before_drop_t = pow(before_drop_normal, .4) * drop_time;
              float after_drop_normal = max(0., c_t - drop_time) / (1. - drop_time);
              float after_drop_t_dot = 3. * pow(after_drop_normal, 2.) * (1. - drop_time);
              float after_drop_t_bar = pow(after_drop_normal, 2.) * (drop_time);

              float eased_drop_t = step(c_t, drop_time) * before_drop_t;
              eased_drop_t += step(drop_time, c_t) * (drop_time + after_drop_t_dot);

              col_uv.x *= (u_resolution.x / u_resolution.y);
              col_uv *= (6. * scale * u_resolution.y);
              col_uv.x += (u_col_width * (.5 * float(num_col) - float(i)));

              vec2 dot_uv = col_uv;
              dot_uv.y += 4. * (eased_drop_t - .5);

              float dot = get_l(dot_uv);
              dot = pow(dot, 3.);

              float drop_grow = step(c_t, drop_time) * pow(before_drop_normal, .4);
              drop_grow += step(drop_time, c_t) * mix(1., .7, clamp(6. * after_drop_normal, 0., 1.));
              dot *= drop_grow;

              dot *= step(.4, drop_time);
              dots += dot;

              vec2 bar_uv = col_uv;
              bar_uv.y += step(c_t, drop_time) * 4. * (before_drop_t - .5);
              bar_uv.y += step(drop_time, c_t) * 4. * (drop_time - after_drop_t_bar - .5);

              float bar = smoothstep(-.4, 0., bar_uv.x) * (1. - smoothstep(0., .4, bar_uv.x));
              bar = pow(bar, 3.);
              light += bar * smoothstep(.0, .1, -bar_uv.x);
              float bar_mask = smoothstep(-.15, .15, bar_uv.y);
              bar *= bar_mask;

              bars += bar;
          }

          shape += bars;
          shape = clamp(shape, 0., 1.);
          shape += dots;

          float gooey = smoothstep(.45, .52, shape);
          gooey -= .08 * smoothstep(.52, .65, shape);
          
          vec3 color = u_color;
          color += vec3(.1, 0., .2) * (1. - vUv.y);
          color *= gooey;
          
          float shimmer = smoothstep(.1, .8, snoise(.8 * uv + u_time * .0003));
          color = mix(color, color + vec3(.3, .1, .4), shimmer * light * .3);

          gl_FragColor = vec4(color, gooey * 0.9);
      }
    `;

    const createShader = (gl, sourceCode, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, sourceCode);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createShaderProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Shader program linking error: " + gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const getUniforms = (gl, program) => {
      const uniforms = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    };

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("WebGL is not supported by your browser.");
      return;
    }

    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
    
    const uniforms = getUniforms(gl, shaderProgram);

    // Setup geometry
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(shaderProgram);
    const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set uniforms
    gl.uniform1f(uniforms.u_col_width, params.colWidth);
    gl.uniform1f(uniforms.u_speed, params.speed);
    gl.uniform1f(uniforms.u_scale, params.scale);
    gl.uniform1f(uniforms.u_seed, params.seed);
    gl.uniform3f(uniforms.u_color, ...params.color);

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
    };

    let animationId;
    const render = () => {
      const currentTime = performance.now();
      gl.uniform1f(uniforms.u_time, currentTime);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return null;
};

const ProjectsSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  
  

  const [activeGroup, setActiveGroup] = useState(0);
  const projectsPerView = 3;
  const totalGroups = Math.ceil(projects.length / projectsPerView);

  const scrollToGroup = (groupIndex) => {
    if (scrollRef.current) {
      const scrollAmount = groupIndex * (320 + 32) * projectsPerView; // card width + gap
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setActiveGroup(groupIndex);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = 320 + 32; // card width + gap
        const currentGroup = Math.round(scrollLeft / (cardWidth * projectsPerView));
        setActiveGroup(Math.min(currentGroup, totalGroups - 1));
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [totalGroups, projectsPerView]);

  return (
    <section 
      ref={sectionRef}
      id="project" 
      className="relative py-32 min-h-[900px] px-8 bg-black bg-transparent overflow-hidden"
    >
      {/* Violet Dripping Effect Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <VioletDrippingEffect canvasRef={canvasRef} sectionRef={sectionRef} />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto absolute top-40">
        <h2 className="text-5xl font-bold mb-8">
          My Projects
        </h2>
        
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 mt-25"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-3xl p-6 hover:bg-opacity-90 transition-all duration-500 cursor-pointer relative overflow-hidden flex-shrink-0 w-80 border border-gray-700 border-opacity-30"
            >
              <div className="relative mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover rounded-xl group-hover:scale-[1.02] transition-all duration-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-500 transition-colors">
                  {project.title}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="text-white text-2xl">↗</span>
                </a>
              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-br from-blue-500 via-transparent to-purple-500 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {Array.from({ length: totalGroups }).map((_, groupIndex) => {
            const startIndex = groupIndex * projectsPerView;
            const endIndex = Math.min(startIndex + projectsPerView, projects.length);
            const isActive = activeGroup === groupIndex;
            
            return (
              <div key={groupIndex} className="flex gap-1">
                {Array.from({ length: endIndex - startIndex }).map((_, dotIndex) => (
                  <div
                    key={`${groupIndex}-${dotIndex}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? 'bg-purple-500' : 'bg-gray-500'
                    }`}
                    onClick={() => scrollToGroup(groupIndex)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;