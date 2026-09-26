import * as THREE from "three";

const npcs = [];

export function createNPC(
  scene,
  x,
  z,
  index
) {

  const person =
    new THREE.Group();

  const colors = [

    0x85322d,
    0x27496a,
    0x3f6743,
    0x85652d,
    0x624261,
    0x525252

  ];

  const clothes =
    new THREE.MeshStandardMaterial({

      color:
        colors[
          index %
          colors.length
        ],

      roughness:
        .9

    });

  const skin =
    new THREE.MeshStandardMaterial({

      color:
        0xc98964,

      roughness:
        .8

    });

  const dark =
    new THREE.MeshStandardMaterial({
      color: 0x151519
    });


  /*
    Torso
  */

  const torso =
    new THREE.Mesh(

      new THREE.CapsuleGeometry(
        .28,
        .55,
        5,
        10
      ),

      clothes

    );

  torso.position.y =
    1.15;

  person.add(torso);


  /*
    Head
  */

  const head =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        .25,
        16,
        12
      ),

      skin

    );

  head.position.y =
    1.92;

  person.add(head);


  /*
    Hair
  */

  const hair =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        .258,
        16,
        10,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      ),

      new THREE.MeshStandardMaterial({
        color: 0x17100d
      })

    );

  hair.position.y =
    2.04;

  person.add(hair);


  /*
    Arms
  */

  const arms = [];

  for (
    const side of [-1,1]
  ) {

    const arm =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          .065,
          .48,
          4,
          8
        ),

        clothes

      );

    arm.position.set(
      side * .34,
      1.15,
      0
    );

    person.add(arm);

    arms.push(arm);

  }


  /*
    Legs
  */

  const legs = [];

  for (
    const side of [-1,1]
  ) {

    const leg =
      new THREE.Mesh(

        new THREE.CapsuleGeometry(
          .085,
          .58,
          4,
          8
        ),

        dark

      );

    leg.position.set(
      side * .14,
      .43,
      0
    );

    person.add(leg);

    legs.push(leg);

  }


  person.position.set(
    x,
    0,
    z
  );


  /*
    NPC movement data
  */

  person.userData = {

    baseX:
      x,

    direction:
      index % 2
        ? 1
        : -1,

    speed:
      .25 +
      Math.random() *
      .25,

    phase:
      Math.random() *
      Math.PI *
      2,

    arms,
    legs

  };


  person.traverse(
    object => {

      if (
        object.isMesh
      ) {

        object.castShadow =
          true;

      }

    }
  );


  scene.add(person);

  npcs.push(person);

}


export function updateNPCs(
  delta,
  time
) {

  npcs.forEach(
    npc => {

      const data =
        npc.userData;


      /*
        Walk along street
      */

      npc.position.z +=
        data.direction *
        data.speed *
        delta;


      /*
        Turn around
      */

      if (
        npc.position.z <
        -68
      ) {

        npc.position.z =
          -68;

        data.direction =
          1;

      }

      if (
        npc.position.z >
        14
      ) {

        npc.position.z =
          14;

        data.direction =
          -1;

      }


      npc.rotation.y =
        data.direction >
        0
          ? 0
          : Math.PI;


      /*
        Walking animation
      */

      const walk =
        Math.sin(
          time *
          5 +
          data.phase
        ) *
        .45;


      data.legs[0]
        .rotation.x =
        walk;

      data.legs[1]
        .rotation.x =
        -walk;


      data.arms[0]
        .rotation.x =
        -walk *
        .7;

      data.arms[1]
        .rotation.x =
        walk *
        .7;


      /*
        Slight body motion
      */

      npc.position.y =
        Math.abs(
          Math.sin(
            time *
            5 +
            data.phase
          )
        ) *
        .025;

    }
  );

}
