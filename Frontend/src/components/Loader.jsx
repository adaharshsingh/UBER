import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WavyDotsLoader = () => {
  const dotsRef = useRef([]);

  useEffect(() => {
    gsap.to(dotsRef.current, {
      y: -8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 0.4,
      stagger: {
        each: 0.1,
        from: 'start',
      },
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default WavyDotsLoader;
