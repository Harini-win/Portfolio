import React, { useEffect, useRef } from "react";

const StarfieldBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, stars;
    let animationId;

    const loadThree = async () => {
      if (!window.THREE) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js";
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
      const THREE = window.THREE;
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 5000);
      camera.position.z = 1070 * 3.5;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0x0f0000, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDTH, HEIGHT);
      mountRef.current.appendChild(renderer.domElement);
      const geometry = new THREE.BufferGeometry();
      const starQty = 1000;
      const spread = 7000; 
      const positions = [];
      for (let i = 0; i < starQty; i++) {
        positions.push(
          Math.random() * spread - spread / 2,
          Math.random() * spread - spread / 2,
          Math.random() * spread - spread / 2
        );
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size: 7,
        opacity: 1,
        color: "#ffffff",
        transparent: true,
      });
      stars = new THREE.Points(geometry, material);
      scene.add(stars);
      let mouseX = 0, mouseY = 0;
      function animate() {
        stars.rotation.x += (mouseY - stars.rotation.x) * 0.000015;
        stars.rotation.y += (mouseX - stars.rotation.y) * 0.000015;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      }
      animate();
      function onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);
      function onMouseMove(e) {
        mouseX = e.clientX - WIDTH / 2;
        mouseY = e.clientY - HEIGHT / 2;
      }
      document.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("mousemove", onMouseMove);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) {
          renderer.dispose();
          if (mountRef.current) mountRef.current.innerHTML = "";
        }
      };
    };

    let cleanup;
    loadThree().then((fn) => { cleanup = fn; });

    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarfieldBackground;