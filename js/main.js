import * as THREE from "three";

import { createWorld } from "./world.js";
import { createPlayer } from "./player.js";
import { updateNPCs } from "./npcs.js";
import { updateParticles } from "./particles.js";

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(0x02040b);

scene.fog =
  new THREE.FogExp2(
    0x05060b,
    0.017
  );

const camera =
  new THREE.PerspectiveCamera(
    68,
    innerWidth / innerHeight,
    0.1,
    180
  );

const renderer =
  new THREE.WebGLRenderer({
    antialias: true
  });

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(
  Math.min(
    devicePixelRatio,
    2
  )
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.15;

document.body.appendChild(
  renderer.domElement
);

createWorld(scene);

const player =
  createPlayer(
    camera,
    renderer.domElement
  );

const startScreen =
  document.querySelector(
    "#startScreen"
  );

document
  .querySelector("#startButton")
  .onclick = () => {

    renderer.domElement
      .requestPointerLock();

  };

renderer.domElement.onclick =
  () => {

    if (
      document.pointerLockElement !==
      renderer.domElement
    ) {

      renderer.domElement
        .requestPointerLock();

    }

  };

document.addEventListener(
  "pointerlockchange",
  () => {

    startScreen.style.display =
      document.pointerLockElement ===
      renderer.domElement
        ? "none"
        : "flex";

  }
);

const location =
  document.querySelector(
    "#location"
  );

function updateLocation() {

  const z =
    camera.position.z;

  if (z > 10)
    location.textContent =
      "牌楼前";

  else if (z > -15)
    location.textContent =
      "小吃街";

  else if (z > -35)
    location.textContent =
      "灯笼巷";

  else if (z > -55)
    location.textContent =
      "老街";

  else
    location.textContent =
      "夜市深部";

}

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);

const clock =
  new THREE.Clock();

function loop() {

  requestAnimationFrame(loop);

  const delta =
    Math.min(
      clock.getDelta(),
      .05
    );

  const time =
    clock.elapsedTime;

  player.update(delta);

  updateNPCs(
    delta,
    time
  );

  updateParticles(time);

  updateLocation();

  renderer.render(
    scene,
    camera
  );

}

loop();
