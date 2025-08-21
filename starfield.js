// 星空粒子特效，鼠标移动时粒子扩散
const canvas = document.createElement('canvas');
canvas.id = 'starfield-canvas';
document.body.prepend(canvas);

let ctx = canvas.getContext('2d');
let dpr = window.devicePixelRatio || 1;
let stars = [];
const STAR_NUM = 130;
const STAR_BASE_RADIUS = 0.8;
const STAR_MAX_RADIUS = 2.8;
const STAR_COLOR = 'rgba(255,255,255,0.85)';
const WIDTH = () => window.innerWidth, HEIGHT = () => window.innerHeight;
let mouse = {x: WIDTH()/2, y: HEIGHT()/2, move: false};

function resize() {
  canvas.width = WIDTH() * dpr;
  canvas.height = HEIGHT() * dpr;
  canvas.style.width = WIDTH() + 'px';
  canvas.style.height = HEIGHT() + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
window.addEventListener('resize', resize);

function randomStar() {
  const orbit = Math.random() * Math.min(WIDTH(), HEIGHT()) * 0.5 + 60;
  const rad = Math.random() * 2 * Math.PI;
  return {
    x: WIDTH()/2 + Math.cos(rad) * orbit,
    y: HEIGHT()/2 + Math.sin(rad) * orbit,
    r: STAR_BASE_RADIUS + Math.random()*(STAR_MAX_RADIUS-STAR_BASE_RADIUS),
    opacity: 0.7 + Math.random()*0.3,
    dx: (Math.random()-0.5)*0.02,
    dy: (Math.random()-0.5)*0.02,
    orbit,
    rad,
    twinkle: Math.random()*100,
  }
}
function createStars() {
  stars = [];
  for (let i=0;i<STAR_NUM;i++) stars.push(randomStar());
}
function updateStars() {
  for (let s of stars) {
    // 粒子轻微运动
    s.rad += (Math.random()-0.5)*0.006 + 0.001;
    s.x = WIDTH()/2 + Math.cos(s.rad)*s.orbit;
    s.y = HEIGHT()/2 + Math.sin(s.rad)*s.orbit;
    // 鼠标移动时，粒子向外扩散
    if (mouse.move) {
      let dx = s.x - mouse.x, dy = s.y - mouse.y, dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < 150) {
        let angle = Math.atan2(dy, dx);
        s.x += Math.cos(angle)*1.5;
        s.y += Math.sin(angle)*1.5;
      }
    }
    // twinkle
    s.r += Math.sin(Date.now()/700 + s.twinkle) * 0.03;
    s.r = Math.max(STAR_BASE_RADIUS, Math.min(STAR_MAX_RADIUS, s.r));
  }
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let s of stars) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(s.x * dpr, s.y * dpr, s.r * dpr, 0, Math.PI*2);
    ctx.globalAlpha = s.opacity;
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 12;
    ctx.fillStyle = STAR_COLOR;
    ctx.fill();
    ctx.restore();
  }
}
function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}
resize();
createStars();
animate();

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.move = true;
  setTimeout(() => {mouse.move = false}, 220);
});
window.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.move = true;
  setTimeout(()=>{mouse.move=false}, 220);
});