import * as THREE from "three";

import {
  createVerticalSign
} from "./signs.js";

export function createBuilding(
  scene,
  x,
  z,
  side,
  index
) {

  const group =
    new THREE.Group();

  const height =
    5.5 +
    (index % 4) *
    .8;

  const width =
    5.5 +
    (index % 2) *
    .8;

  const depth =
    8.5;


  /*
    Main building
  */

  const wallColors = [

    0x342b29,
    0x29282a,
    0x3a3029,
    0x262a2c

  ];

  const wall =
    new THREE.MeshStandardMaterial({

      color:
        wallColors[
          index %
          wallColors.length
        ],

      roughness:
        .95

    });

  const building =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),

      wall

    );

  building.position.y =
    height / 2;

  building.castShadow =
    true;

  building.receiveShadow =
    true;

  group.add(building);


  /*
    Shop front
  */

  const frontX =
    side === "left"
      ? width / 2 + .03
      : -width / 2 - .03;

  const shop =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        2.8,
        2.2
      ),

      new THREE.MeshStandardMaterial({

        color: 0x261510,

        emissive: 0x4b1e08,

        emissiveIntensity: .7

      })

    );

  shop.position.set(
    frontX,
    1.15,
    0
  );

  shop.rotation.y =
    side === "left"
      ? Math.PI / 2
      : -Math.PI / 2;

  group.add(shop);


  /*
    Windows
  */

  for (
    let y = 3;
    y < height - .5;
    y += 1.6
  ) {

    for (
      let zz = -3;
      zz <= 3;
      zz += 2
    ) {

      const lit =
        Math.random() >
        .45;

      const window =
        new THREE.Mesh(

          new THREE.PlaneGeometry(
            .75,
            .85
          ),

          new THREE.MeshStandardMaterial({

            color:
              lit
                ? 0x8a5224
                : 0x101318,

            emissive:
              lit
                ? 0xff7625
                : 0x000000,

            emissiveIntensity:
              lit
                ? .9
                : 0

          })

        );

      window.position.set(
        frontX,
        y,
        zz
      );

      window.rotation.y =
        side === "left"
          ? Math.PI / 2
          : -Math.PI / 2;

      group.add(window);

    }

  }


  /*
    Balcony
  */

  if (
    index % 2 === 0
  ) {

    const balcony =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .8,
          .12,
          3
        ),

        new THREE.MeshStandardMaterial({
          color: 0x191919
        })

      );

    balcony.position.set(
      side === "left"
        ? width / 2 + .4
        : -width / 2 - .4,

      3.1,

      0
    );

    group.add(balcony);

  }


  /*
    AC
  */

  const ac =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        .45,
        .6,
        .9
      ),

      new THREE.MeshStandardMaterial({
        color: 0x77736b,
        roughness: .8
      })

    );

  ac.position.set(
    side === "left"
      ? width / 2 + .25
      : -width / 2 - .25,

    2.5,

    2.8
  );

  group.add(ac);


  /*
    Pipe
  */

  const pipe =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .055,
        .055,
        height * .8,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x161616
      })

    );

  pipe.position.set(
    side === "left"
      ? width / 2 + .15
      : -width / 2 - .15,

    height * .4,

    -3.3
  );

  group.add(pipe);


  /*
    Vertical neon sign
  */

  if (
    index % 2 === 0
  ) {

    createVerticalSign(
      group,

      side === "left"
        ? width / 2 + .15
        : -width / 2 - .15,

      3.4,

      -2,

      index % 4 === 0
        ? "老街烧烤"
        : "夜市小吃",

      side

    );

  }


  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);

}
