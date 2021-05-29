var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 3000);

var renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color(0x0a0a0a);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
cam.position.z += 1000;
cam.position.y += 1000;

// let cGeo = new THREE.BoxGeometry(1, 1, 1);
// let cMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// let cMesh = new THREE.Mesh(cGeo, cMat);
// scene.add(cMesh);

let planeGeo = new THREE.PlaneGeometry(1000, 1000);
let PlaneMesh = new THREE.Mesh(
  planeGeo,
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
PlaneMesh.rotation.x -= Math.PI / 2;
PlaneMesh.position.y -= 0.5;
scene.add(PlaneMesh);

let loaderFBX = new THREE.FBXLoader().load(
  "models/Kate.fbx",
  function (object) {
    let animation = new THREE.FBXLoader().load(
      "animations/Walking.fbx",
      function (anim) {
        const m = new THREE.AnimationMixer(object);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      }
    );

    scene.add(object);
  }
);



let loader1 = new THREE.GLTFLoader().load(
  "models/naruto_rigged/scene.gltf",
  function (object) {
    let naruto = object.scene.children[0];
    scene.add(naruto);
  }
);

let loader2 = new THREE.GLTFLoader().load(
  "models/beverage can.glb",
  function (object) {
    let balom = object.scene.children[0];
    scene.add(balom);
  }
);

// const loader = new THREE.FBXLoader();
// loader.setPath("./models/");
// loader.load("Kate.fbx", (fbx) => {
//   fbx.scale.setScalar(0.1);
//   fbx.traverse((c) => {
//     c.castShadow = true;
//   });

//   const params = {
//     target: fbx,
//     camera: this._camera,
//   };
//   // this._controls = new BasicCharacterControls(params);

//   const anim = new THREE.FBXLoader();
//   anim.setPath("./animations/");
//   anim.load("Walking.fbx", (anim) => {
//     const m = new THREE.AnimationMixer(fbx);
//     this._mixers.push(m);
//     const idle = m.clipAction(anim.animations[0]);
//     idle.play();
//   });
//   this._scene.add(fbx);
// });

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

window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  cam.aspect = this.window.innerHeight / this.window.innerHeight;
  cam.updateProjectionMatrix();
});
