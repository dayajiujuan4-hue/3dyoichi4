import * as THREE from "three";

export function createPlayer(
  camera,
  element
) {

  camera.position.set(
    0,
    1.7,
    17
  );

  let yaw = 0;
  let pitch = 0;

  let walkTime = 0;

  const keys = {};

  document.addEventListener(
    "keydown",
    e => {

      keys[
        e.key.toLowerCase()
      ] = true;

    }
  );

  document.addEventListener(
    "keyup",
    e => {

      keys[
        e.key.toLowerCase()
      ] = false;

    }
  );

  document.addEventListener(
    "mousemove",
    e => {

      if (
        document.pointerLockElement !==
        element
      ) return;

      yaw -=
        e.movementX *
        .002;

      pitch -=
        e.movementY *
        .002;

      pitch =
        THREE.MathUtils.clamp(
          pitch,
          -1.35,
          1.35
        );

    }
  );


  function update(delta) {

    camera.rotation.order =
      "YXZ";

    camera.rotation.y =
      yaw;

    camera.rotation.x =
      pitch;


    const direction =
      new THREE.Vector3();

    camera.getWorldDirection(
      direction
    );

    direction.y = 0;

    direction.normalize();


    const right =
      new THREE.Vector3(
        direction.z,
        0,
        -direction.x
      );


    const speed =
      keys["shift"]
        ? 7
        : 3.8;


    let moving =
      false;


    if (keys["w"]) {

      camera.position
        .addScaledVector(
          direction,
          speed * delta
        );

      moving = true;

    }

    if (keys["s"]) {

      camera.position
        .addScaledVector(
          direction,
          -speed * delta
        );

      moving = true;

    }

    if (keys["a"]) {

      camera.position
        .addScaledVector(
          right,
          -speed * delta
        );

      moving = true;

    }

    if (keys["d"]) {

      camera.position
        .addScaledVector(
          right,
          speed * delta
        );

      moving = true;

    }


    /*
      Camera bob
    */

    if (moving) {

      walkTime +=
        delta *
        (keys["shift"] ? 11 : 8);

      camera.position.y =
        1.7 +
        Math.sin(
          walkTime
        ) *
        .025;

    } else {

      camera.position.y +=
        (1.7 -
        camera.position.y) *
        .15;

    }


    /*
      Street boundaries
    */

    camera.position.x =
      THREE.MathUtils.clamp(
        camera.position.x,
        -4.7,
        4.7
      );

    camera.position.z =
      THREE.MathUtils.clamp(
        camera.position.z,
        -72,
        18
      );

  }


  return {
    update
  };

}
