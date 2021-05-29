var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100);

var renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color(0x0a0a0a);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.z += 5;

let cGeo = new THREE.BoxGeometry(1, 1, 1);
let cMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let cMesh = new THREE.Mesh(cGeo, cMat);
scene.add(cMesh);

let planeGeo = new THREE.PlaneGeometry(100, 100);
let PlaneMesh = new THREE.Mesh(
  planeGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
PlaneMesh.rotation.x -= Math.PI / 2;
PlaneMesh.position.y -= 0.5;
scene.add(PlaneMesh);

window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  cam.aspect = this.window.innerHeight / this.window.innerHeight;
  cam.updateProjectionMatrix();
});


let controls = new THREE.OrbitControls(cam, renderer.domElement);


// First Person Controls, memerlukan adanya clock
// let clock = new THREE.Clock();
// let controls = new THREE.FirstPersonControls(cam, renderer.domElement);
// controls.lookSpeed = 0.1;


function update() {
//   controls.update(clock.getDelta()); //digunakan utk fps control
  requestAnimationFrame(update);
  renderer.render(scene, cam);
}
update();

renderer.render(scene, cam);
