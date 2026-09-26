import * as THREE from "three";

export function createLighting(
  scene
) {

  /*
    Very dark ambient light.
  */

  const hemisphere =
    new THREE.HemisphereLight(
      0x28345a,
      0x120707,
      1.05
    );

  scene.add(hemisphere);


  /*
    Moonlight
  */

  const moon =
    new THREE.DirectionalLight(
      0x7894d8,
      1.6
    );

  moon.position.set(
    -15,
    25,
    15
  );

  moon.castShadow =
    true;

  moon.shadow.mapSize.set(
    2048,
    2048
  );

  moon.shadow.camera.left =
    -30;

  moon.shadow.camera.right =
    30;

  moon.shadow.camera.top =
    30;

  moon.shadow.camera.bottom =
    -30;

  scene.add(moon);


  /*
    Warm light from entrance.
  */

  const entrance =
    new THREE.PointLight(
      0xff6a22,
      20,
      14,
      2
    );

  entrance.position.set(
    0,
    4,
    15
  );

  scene.add(entrance);

}
