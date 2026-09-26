import * as THREE from "three";

import {
  createLighting
} from "./lighting.js";

import {
  createBuilding
} from "./buildings.js";

import {
  createStall
} from "./stalls.js";

import {
  createNPC
} from "./npcs.js";

import {
  createProps
} from "./props.js";

import {
  createSteam
} from "./particles.js";

export function createWorld(scene) {

  createLighting(scene);

  createStreet(scene);

  createArchitecture(scene);

  createNightMarket(scene);

  createLanterns(scene);

  createPeople(scene);

  createProps(scene);

  createGate(scene);

}


/* STREET */

function createStreet(scene) {

  const ground =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        45,
        130
      ),

      new THREE.MeshStandardMaterial({
        color: 0x101013,
        roughness: .72,
        metalness: .18
      })

    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.position.z =
    -32;

  ground.receiveShadow =
    true;

  scene.add(ground);


  /*
    Wet road

    Slightly reflective strip
  */

  const wet =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        8.5,
        115
      ),

      new THREE.MeshStandardMaterial({

        color: 0x18191c,

        roughness: .30,

        metalness: .38

      })

    );

  wet.rotation.x =
    -Math.PI / 2;

  wet.position.set(
    0,
    .012,
    -34
  );

  wet.receiveShadow =
    true;

  scene.add(wet);


  /*
    Drainage channels
  */

  for (
    const x of [-4.4,4.4]
  ) {

    const drain =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .16,
          .03,
          110
        ),

        new THREE.MeshStandardMaterial({
          color: 0x050505,
          metalness: .6
        })

      );

    drain.position.set(
      x,
      .025,
      -32
    );

    scene.add(drain);

  }

}


/* BUILDINGS */

function createArchitecture(scene) {

  let index = 0;

  for (
    let z = 11;
    z > -75;
    z -= 10
  ) {

    createBuilding(
      scene,
      -10,
      z,
      "left",
      index
    );

    createBuilding(
      scene,
      10,
      z - 3,
      "right",
      index + 1
    );

    index++;

  }

}


/* STALLS */

function createNightMarket(scene) {

  const names = [

    "烧烤",
    "小龙虾",
    "奶茶",
    "臭豆腐",
    "小笼包",
    "煎饼",
    "烤冷面",
    "兰州拉面",
    "水果",
    "麻辣烫",
    "炸串",
    "冰粉"

  ];

  let index = 0;

  for (
    let z = 10;
    z > -68;
    z -= 8
  ) {

    createStall(
      scene,
      -6.4,
      z,
      names[
        index %
        names.length
      ],
      "left"
    );

    createStall(
      scene,
      6.4,
      z - 3,
      names[
        (index + 4) %
        names.length
      ],
      "right"
    );

    if (
      index % 2 === 0
    ) {

      createSteam(
        scene,
        index % 4
          ? -6
          : 6,

        z
      );

    }

    index++;

  }

}


/* LANTERNS */

function createLanterns(scene) {

  for (
    let z = 15;
    z > -72;
    z -= 5.5
  ) {

    const points = [

      new THREE.Vector3(
        -7,
        5.4,
        z
      ),

      new THREE.Vector3(
        0,
        5,
        z
      ),

      new THREE.Vector3(
        7,
        5.4,
        z
      )

    ];

    const wire =
      new THREE.Line(

        new THREE.BufferGeometry()
          .setFromPoints(points),

        new THREE.LineBasicMaterial({
          color: 0x090909
        })

      );

    scene.add(wire);

    for (
      let x = -5;
      x <= 5;
      x += 2
    ) {

      createLantern(
        scene,
        x,
        4.65,
        z
      );

    }

  }

}

function createLantern(
  scene,
  x,
  y,
  z
) {

  const group =
    new THREE.Group();

  const lantern =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        .23,
        14,
        10
      ),

      new THREE.MeshStandardMaterial({

        color: 0xff2814,

        emissive: 0xff1000,

        emissiveIntensity: 3.5,

        roughness: .45

      })

    );

  lantern.scale.y =
    1.35;

  group.add(lantern);


  const cap =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .11,
        .11,
        .08,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x9c6b20
      })

    );

  cap.position.y =
    .34;

  group.add(cap);


  group.position.set(
    x,
    y,
    z
  );

  scene.add(group);


  /*
    Not every lantern gets a light.
    Much better performance.
  */

  if (
    Math.abs(x) < .5 &&
    Math.round(z) % 2
  ) {

    const light =
      new THREE.PointLight(
        0xff3c18,
        8,
        6,
        2
      );

    light.position.set(
      x,
      y - .3,
      z
    );

    scene.add(light);

  }

}


/* PEOPLE */

function createPeople(scene) {

  const positions = [

    [-2.5,10],
    [2.2,7],
    [-1,2],
    [2.7,-4],
    [-2.8,-9],
    [1.3,-14],
    [-2,-20],
    [2.4,-25],
    [-1,-31],
    [2.7,-36],
    [-2.4,-42],
    [1.4,-47],
    [-1.8,-53],
    [2.5,-58],
    [-2.3,-64]

  ];

  positions.forEach(
    (p,i) => {

      createNPC(
        scene,
        p[0],
        p[1],
        i
      );

    }
  );

}


/* GATE */

function createGate(scene) {

  const gate =
    new THREE.Group();

  const red =
    new THREE.MeshStandardMaterial({

      color: 0x75100e,

      roughness: .62

    });

  const gold =
    new THREE.MeshStandardMaterial({

      color: 0xc99835,

      metalness: .25,

      roughness: .5

    });


  for (
    const x of [-5,5]
  ) {

    const pillar =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .43,
          .52,
          6,
          16
        ),

        red

      );

    pillar.position.set(
      x,
      3,
      18
    );

    pillar.castShadow =
      true;

    gate.add(pillar);

  }


  const beam =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        11,
        .65,
        1
      ),

      red

    );

  beam.position.set(
    0,
    5.3,
    18
  );

  gate.add(beam);


  /*
    Decorative roof
  */

  const roof =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        12.5,
        .18,
        2
      ),

      red

    );

  roof.position.set(
    0,
    5.85,
    18
  );

  roof.rotation.z =
    .025;

  gate.add(roof);


  for (
    const x of [-6,6]
  ) {

    const end =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .7,
          .22,
          2
        ),

        gold

      );

    end.position.set(
      x,
      5.95,
      18
    );

    end.rotation.z =
      x < 0
        ? -.2
        : .2;

    gate.add(end);

  }

  scene.add(gate);

}
