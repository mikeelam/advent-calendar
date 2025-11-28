
(function(){
  const canvas = document.createElement('canvas');
  canvas.id = 'snow-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H;
  const flakes = [];
  const FLAKE_COUNT = 120; // adjust density

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for(let i=0;i<FLAKE_COUNT;i++){
    flakes.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*2.2 + 0.8, // radius
      d: Math.random()*1.5 + 0.5,  // vertical speed
      w: Math.random()*0.8 + 0.2   // horizontal sway
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    flakes.forEach(f=>{
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
      f.y += f.d;
      f.x += Math.sin(f.y * 0.01) * f.w;
      if(f.y > H){ f.y = -5; f.x = Math.random()*W; }
    });
    ctx.fill();
    requestAnimationFrame(draw);
  }
  draw();
})();
