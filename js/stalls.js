import * as THREE from "three";

import {
  createHorizontalSign
} from "./signs.js";

export function createStall(
  scene,
  x,
  z,
  name,
  side
) {

  const group =
    new THREE.Group();

  group.position.set(
    x,
    0,
    z
  );

  const wood =
    new THREE.MeshStandardMaterial({
      color: 0x51270f,
      roughness: .92
    });


  /*
    Counter
  */

  const counter =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.7,
        .85,
        1.55
      ),

      wood

    );

  counter.position.y =
    .43;

  counter.castShadow =
    true;

  group.add(counter);


  /*
    Poles
  */

  for (
    const px of [-1.6,1.6]
  ) {

    const pole =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .055,
          .065,
          2.5,
          8
        ),

        wood

      );

    pole.position.set(
      px,
      1.8,
      0
    );

    group.add(pole);

  }


  /*
    Canopy
  */

  const canopy =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4.2,
        .14,
        2.4
      ),

      new THREE.MeshStandardMaterial({

        color:
          Math.random() >
          .5
            ? 0xa81717
            : 0xc45816,

        roughness: .85

      })

    );

  canopy.position.y =
    3;

  canopy.castShadow =
    true;

  group.add(canopy);


  /*
    Sign
  */

  const sign =
    createHorizontalSign(
      name
    );

  sign.position.set(
    0,
    2.45,
    side === "left"
      ? -1.23
      : 1.23
  );

  if (
    side === "right"
  ) {

    sign.rotation.y =
      Math.PI;

  }

  group.add(sign);


  /*
    Cooking pan
  */

  const pan =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .48,
        .42,
        .14,
        24
      ),

      new THREE.MeshStandardMaterial({

        color: 0x151515,

        metalness: .75,

        roughness: .28

      })

    );

  pan.position.set(
    -.8,
    .95,
    0
  );

  group.add(pan);


  /*
    Food bowls
  */

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const bowl =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .17,
          .12,
          .1,
          16
        ),

        new THREE.MeshStandardMaterial({

          color:
            i % 2
              ? 0xe3d6b6
              : 0x9f2717

        })

      );

    bowl.position.set(
      .25 +
      i * .4,

      .92,

      -.2
    );

    group.add(bowl);

  }


  /*
    Hanging bulbs
  */

  for (
    const px of [-1.2,0,1.2]
  ) {

    const bulb =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          .07,
          10,
          8
        ),

        new THREE.MeshStandardMaterial({

          color: 0xffd991,

          emissive:
            0xff9c3b,

          emissiveIntensity:
            5

        })

      );

    bulb.position.set(
      px,
      2.65,
      0
    );

    group.add(bulb);

  }


  /*
    Only one actual PointLight
    per stall.
  */

  const lamp =
    new THREE.PointLight(
      0xff8c35,
      13,
      5,
      2
    );

  lamp.position.set(
    0,
    2.3,
    0
  );

  group.add(lamp);


  scene.add(group);

}
