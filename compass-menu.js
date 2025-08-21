// 右键罗盘菜单，点击选项可切换信息
const compass = document.createElement('div');
compass.id = 'compass-menu';
compass.innerHTML = `
  <div id="compass-menu-inner">
    <button id="compass-personal">个人信息</button>
    <button id="compass-career">职业信息</button>
    <button id="compass-family">家庭信息</button>
    <div id="compass-center">选择</div>
  </div>
`;
document.body.appendChild(compass);

function showCompassMenu(x, y) {
  compass.style.display = 'block';
  compass.style.left = (x-90) + 'px';
  compass.style.top = (y-90) + 'px';
  setTimeout(()=>{compass.style.pointerEvents='auto'},0);
}
function hideCompassMenu() {
  compass.style.display = 'none';
  compass.style.pointerEvents='none';
}
window.addEventListener('contextmenu', function(e){
  e.preventDefault();
  showCompassMenu(e.clientX, e.clientY);
});
window.addEventListener('mousedown', function(e){
  if (!compass.contains(e.target)) hideCompassMenu();
});
['compass-personal','compass-career','compass-family'].forEach(id=>{
  document.getElementById(id).onclick = function(){
    hideCompassMenu();
    // 切换左侧tab
    document.getElementById('btn-' + id.split('-')[1]).click();
  }
});