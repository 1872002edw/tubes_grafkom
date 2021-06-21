var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 10000);
let clock = new THREE.Clock();
let mixer;
let kate;
let thermo;
let themo_sudut_awal;

var renderer = new THREE.WebGLRenderer({ canvas: artifactCanvas });
scene.background = new THREE.Color(0x0a0a0a);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z += 1000;
camera.position.y += 1000;
camera.position.set(1.31, 191.3, 418);
console.log(camera.position);

let planeGeo = new THREE.PlaneGeometry(1000, 1000);
let PlaneMesh = new THREE.Mesh(
  planeGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
PlaneMesh.rotation.x -= Math.PI / 2;
PlaneMesh.position.y -= 0.5;
PlaneMesh.receiveShadow = true;
scene.add(PlaneMesh);

const loader = new THREE.FBXLoader();
loader.load("./models/Kate_walk.fbx", function (object) {
  kate = object;
  mixer = new THREE.AnimationMixer(object);
  const action = mixer.clipAction(object.animations[0]);
  action.play();
  object.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(object);
});

let loader1 = new THREE.GLTFLoader().load(
  "models/starbucks-coffee/scene.gltf",
  function (object) {
    let home = object.scene.children[0];
    home.position.setZ(150)
    home.position.setX(-200)
    home.rotation.z += Math.PI/2;
    scene.add(home);
  }
);

// Thermogun (Ryan)
const thermogun = new THREE.FBXLoader();
thermogun.load("models/thermogun.fbx", function(object){
  thermo = object;
  themo_sudut_awal = thermo.position.y;
  object.scale.set(8,8,8);
  object.position.set(1,85,300);  
  scene.add(object);
});

// fence (Ryan)
const fence1 = new THREE.FBXLoader();
fence1.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(-80);
  object.position.setZ(60);
  scene.add(object);
});

const fence2 = new THREE.FBXLoader();
fence2.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(80);
  object.position.setZ(60);
  scene.add(object);
});

const fence3 = new THREE.FBXLoader();
fence3.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(80);
  object.position.setZ(-148);
  scene.add(object);
});

const fence4 = new THREE.FBXLoader();
fence4.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(-80);
  object.position.setZ(-148);
  scene.add(object);
});

const fence5 = new THREE.FBXLoader();
fence5.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(80);
  object.position.setZ(-356);
  scene.add(object);
});

const fence6 = new THREE.FBXLoader();
fence6.load("models/metalfence.fbx", function(object){
  object.rotation.y = 29.85
  object.position.setX(-80);
  object.position.setZ(-356);
  scene.add(object);
});

const ft = new THREE.TextureLoader().load("skyBox/px.png");
const bk = new THREE.TextureLoader().load("skyBox/nx.png");
const up = new THREE.TextureLoader().load("skyBox/py.png");
const dn = new THREE.TextureLoader().load("skyBox/ny.png");
const rt = new THREE.TextureLoader().load("skyBox/pz.png");
const lf = new THREE.TextureLoader().load("skyBox/nz.png");
const materialArray = [
  new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide }), 
  new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide }), 
  new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }), 
  new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide }), 
  new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide }), 
  new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide }), 
]
skyboxGeo = new THREE.BoxGeometry(3000, 3000, 3000);

skybox = new THREE.Mesh(skyboxGeo, materialArray);
skybox.position.setY(1500);
scene.add(skybox);

// let loader1 = new THREE.CubeTextureLoader();
// let skyBox = loader1.load([
//   '../skyBox/px.png',
//   '../skyBox/nx.png',
//   '../skyBox/py.png',
//   '../skyBox/ny.png',
//   '../skyBox/pz.png',
//   '../skyBox/nz.png',
// ]);

// scene.background = skyBox;


var directionalLight = new THREE.DirectionalLight(
  0x00ff00,
  0.5,
  5,
  Math.PI / 10
);
directionalLight.position.set(500, 500, 0);
// - mengubah posisi target
scene.add(directionalLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

let skor = 0;
let pulang = false;
let terima = false;
let langkah = 5;
let suhu = getSuhu();
let timerstart = false;
let level = 1;
let detik = cekLevel(skor);
let timer = 5 * detik;

main();

function main() {
  window.addEventListener("resize", onWindowResize);
  animate();
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (kate != null && thermo != null) {
    jalan(kate);
    //cam follow object
    camera.lookAt(new THREE.Vector3(kate.position.x,150,kate.position.z));
    // thermo_putar(kate,thermo,180,themo_sudut_awal);
  }

  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}



