var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 3000);
let clock = new THREE.Clock();
let mixer;
let kate;

var renderer = new THREE.WebGLRenderer( { canvas: artifactCanvas } );
scene.background = new THREE.Color(0x0a0a0a);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.z += 1000;
camera.position.y += 1000;

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


var directionalLight = new THREE.DirectionalLight(
  0x00ff00,
  0.5,
  5,
  Math.PI / 10
);
directionalLight.position.set(500, 500, 0);
// - mengubah posisi target
scene.add(directionalLight);
scene.add(new THREE.DirectionalLightHelper(directionalLight));

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

var ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

let controls = new THREE.OrbitControls(camera, renderer.domElement);

// First Person Controls, memerlukan adanya clock
// let clock = new THREE.Clock();
// let controls = new THREE.FirstPersonControls(cam, renderer.domElement);
// controls.lookSpeed = 0.1;


let diam = false;
let pulang = false;
main();

function main(){
  window.addEventListener("resize", onWindowResize);
  
  animate();
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//


function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  jalan(kate);

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);

}

function jalan(orang) {
  if(!diam){
    if (orang.position.z < 200) {
      if(!pulang){
        orang.position.z += 1;
      } else {
        orang.position.z -= 1;
      }
    } else if (orang.position.z < -200) {
      reset(orang);
    } else {
      putar_balik(orang);
    }
  } 
}

function belok_kiri(orang) {
  if (orang.rotation.y <= Math.PI / 2) {
    orang.rotation.y += 0.01;
  }
  orang.position.x += 1;
}

function belok_kanan(orang) {
  if (orang.rotation.y >= -Math.PI / 2) {
    orang.rotation.y -= 0.01;
  } else {
    reset(orang)
  }
  orang.position.x -= 1;
}

function putar_balik(orang) {
  if (orang.rotation.y <= Math.PI / 2) {
    orang.rotation.y += 0.01;
    orang.position.z += 1;
  } else if (orang.rotation.y <= Math.PI){
    orang.rotation.y += 0.01;
    orang.position.z -= 1;
  } else {
    reset(orang)
  }
    orang.position.x += 1;
}

function reset(orang){
  orang.position.x = 0;
  orang.position.y = 0;
  orang.position.z = 0;
  orang.rotation.y = 0;
  pulang = false;
}

document.getElementById("buttonTerima").onclick = function() {
  diam = false;
  alert();
};