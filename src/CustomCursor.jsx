import React, { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursorSmall = document.querySelector('.cursor-small');
    const cursorLarge = document.querySelector('.cursor-large');
    let mouseX = 0, mouseY = 0, largeX = 0, largeY = 0;

    // Mouse move handler
    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorSmall) {
        cursorSmall.style.left = mouseX + 'px';
        cursorSmall.style.top = mouseY + 'px';
      }
    };

    // Animate large cursor
    function animateLargeCursor() {
      const ease = 0.15;
      largeX += (mouseX - largeX) * ease;
      largeY += (mouseY - largeY) * ease;
      if (cursorLarge) {
        cursorLarge.style.left = largeX + 'px';
        cursorLarge.style.top = largeY + 'px';
      }
      requestAnimationFrame(animateLargeCursor);
    }

    // Hover effect for interactive elements
    const hoverElements = document.querySelectorAll(
      'a, button, .group, .cursor-hover, input, textarea, select'
    );
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorLarge) cursorLarge.style.transform = 'translate(-50%, -50%) scale(1.5)';
        if (cursorSmall) cursorSmall.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        if (cursorLarge) cursorLarge.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursorSmall) cursorSmall.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Hide on mouse leave
    const hide = () => {
      if (cursorSmall) cursorSmall.style.opacity = '0';
      if (cursorLarge) cursorLarge.style.opacity = '0';
    };
    const show = () => {
      if (cursorSmall) cursorSmall.style.opacity = '1';
      if (cursorLarge) cursorLarge.style.opacity = '1';
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    animateLargeCursor();

    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <>
      <div className="cursor-small"></div>
      <div className="cursor-large"></div>
    </>
  );
};

export default CustomCursor;