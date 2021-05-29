window.addEventListener('load', init);

init();

function init() {
  const width = 960;
  const height = 540;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  const loader = new THREE.FBXLoader();
  loader.load("models/Kate.fbx", function(object) {
    scene.add(object);
  });

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 200, 100);

  const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  document.body.appendChild(renderer.domElement);
  tick();
  function tick() {
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
  }
}