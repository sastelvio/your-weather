import React, { useEffect, useRef } from 'react';

const Thunderstorm = () => {
  const thunderstormRef = useRef(null);

  useEffect(() => {
    const thunderstormCanvas = thunderstormRef.current;
    const ctx = thunderstormCanvas.getContext('2d');

    let lightning = [];
    let lightTimeCurrent = 0;
    let lightTimeTotal = 0;

    let w = thunderstormCanvas.width = window.innerWidth;
    let h = thunderstormCanvas.height = window.innerHeight;
    window.addEventListener('resize', function () {
      w = thunderstormCanvas.width = window.innerWidth;
      h = thunderstormCanvas.height = window.innerHeight;
    });

    function random(min, max) {
      return Math.random() * (max - min + 1) + min;
    }

    function clearThunderstorm() {
      ctx.clearRect(0, 0, w, h);
    }

    function createLightning() {
      let x = random(100, w - 100);
      //let y = random(0, h / 4); //randonly set the vertical start
      let y = 0;

      let createCount = random(1, 3);
      for (let i = 0; i < createCount; i++) {
        let single = {
          x: x,
          y: y,
          xRange: random(5, 30),
          yRange: random(10, 25),
          path: [{
            x: x,
            y: y
          }],
          pathLimit: random(40, 55)
        };
        lightning.push(single);
      }
    };

    function drawLightning() {
      for (let i = 0; i < lightning.length; i++) {
        let light = lightning[i];

        light.path.push({
          x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
          y: light.path[light.path.length - 1].y + (random(0, light.yRange))
        });

        if (light.path.length > light.pathLimit) {
          lightning.splice(i, 1);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, .8)';
        ctx.lineWidth = 6;
        if (random(0, 15) === 0) {
          ctx.lineWidth = 9;
        }
        if (random(0, 30) === 0) {
          ctx.lineWidth = 12;
        }

        ctx.beginPath();
        ctx.moveTo(light.x, light.y);
        for (let pc = 0; pc < light.path.length; pc++) {
          ctx.lineTo(light.path[pc].x, light.path[pc].y);
        }
        if (Math.floor(random(0, 30)) === 1) {
          ctx.fillStyle = 'rgba(255, 255, 255, ' + random(5, 8) / 10 + ')';

          ctx.fillRect(0, 0, w, h);
        }
        ctx.lineJoin = 'miter';
        ctx.stroke();
      }
    };

    function animateLightning() {
      clearThunderstorm();
      lightTimeCurrent++;
      if (lightTimeCurrent >= lightTimeTotal) {
        createLightning();
        lightTimeCurrent = 0;
        lightTimeTotal = 90; //rand(100, 200)
      }
      drawLightning();
    }

    function animloop() {
      animateLightning();
      requestAnimationFrame(animloop);
    }

    // Initial lightning animation
    animloop();

    // Start showing lightning every 5 seconds
    const interval = setInterval(() => {
      createLightning();
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);


  return <canvas ref={thunderstormRef} />;
};

export default Thunderstorm;
