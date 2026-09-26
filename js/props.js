import * as THREE from "three";

export function createProps(
  scene
) {

  createTables(scene);

  createCrates(scene);

  createTrashBins(scene);

  createScooters(scene);

  createWires(scene);

}


/* TABLES */

function createTables(scene) {

  const wood =
    new THREE.MeshStandardMaterial({
      color: 0x542b16
    });

  const positions = [

    [-3,5],
    [3,-8],
    [-3,-21],
    [3,-35],
    [-3,-49]

  ];

  positions.forEach(
    ([x,z]) => {

      const table =
        new THREE.Group();

      const top =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            .55,
            .55,
            .08,
            18
          ),

          wood

        );

      top.position.y =
        .72;

      table.add(top);


      const leg =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            .06,
            .07,
            .7,
            8
          ),

          wood

        );

      leg.position.y =
        .35;

      table.add(leg);


      /*
        Plastic stools
      */

      for (
        let i = 0;
        i < 3;
        i++
      ) {

        const angle =
          i /
          3 *
          Math.PI *
          2;

        const stool =
          new THREE.Mesh(

            new THREE.CylinderGeometry(
              .22,
              .25,
              .38,
              12
            ),

            new THREE.MeshStandardMaterial({

              color:
                i % 2
                  ? 0x174b83
                  : 0xa51c19

            })

          );

        stool.position.set(
          Math.cos(angle) *
          .9,

          .19,

          Math.sin(angle) *
          .9
        );

        table.add(stool);

      }


      table.position.set(
        x,
        0,
        z
      );

      scene.add(table);

    }
  );

}


/* CRATES */

function createCrates(scene) {

  for (
    let i = 0;
    i < 12;
    i++
  ) {

    const crate =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .7,
          .45,
          .7
        ),

        new THREE.MeshStandardMaterial({

          color:
            i % 2
              ? 0x24598c
              : 0x3a7a3b,

          roughness:
            .9

        })

      );

    crate.position.set(

      i % 2
        ? -5
        : 5,

      .23,

      8 -
      i * 6

    );

    crate.rotation.y =
      Math.random();

    scene.add(crate);

  }

}


/* TRASH */

function createTrashBins(scene) {

  for (
    let z = 0;
    z > -60;
    z -= 18
  ) {

    const bin =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .28,
          .3,
          .65,
          12
        ),

        new THREE.MeshStandardMaterial({

          color: 0x303336,

          metalness: .3,

          roughness: .65

        })

      );

    bin.position.set(
      4.6,
      .33,
      z
    );

    scene.add(bin);

  }

}


/* SCOOTER */

function createScooters(scene) {

  const locations = [

    [-4.8,-12],
    [4.8,-29],
    [-4.7,-53]

  ];

  locations.forEach(
    ([x,z],index) => {

      const scooter =
        new THREE.Group();

      const dark =
        new THREE.MeshStandardMaterial({
          color: 0x111111
        });

      const bodyMaterial =
        new THREE.MeshStandardMaterial({

          color:
            index % 2
              ? 0x173b63
              : 0x8c1b17,

          metalness:
            .2

        });


      /*
        Wheels
      */

      for (
        const zz of [-.55,.55]
      ) {

        const wheel =
          new THREE.Mesh(

            new THREE.TorusGeometry(
              .24,
              .06,
              8,
              16
            ),

            dark

          );

        wheel.rotation.y =
          Math.PI / 2;

        wheel.position.set(
          0,
          .25,
          zz
        );

        scooter.add(wheel);

      }


      /*
        Body
      */

      const body =
        new THREE.Mesh(

          new THREE.CapsuleGeometry(
            .18,
            .6,
            5,
            10
          ),

          bodyMaterial

        );

      body.rotation.x =
        Math.PI / 2;

      body.position.y =
        .48;

      scooter.add(body);


      /*
        Seat
      */

      const seat =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            .35,
            .12,
            .55
          ),

          dark

        );

      seat.position.set(
        0,
        .72,
        .1
      );

      scooter.add(seat);


      scooter.position.set(
        x,
        0,
        z
      );

      scooter.rotation.y =
        index % 2
          ? -.2
          : .3;

      scene.add(scooter);

    }
  );

}


/* WIRES */

function createWires(scene) {

  for (
    let z = 10;
    z > -65;
    z -= 11
  ) {

    for (
      let i = 0;
      i < 3;
      i++
    ) {

      const points = [

        new THREE.Vector3(
          -10,
          5.5 + i * .25,
          z
        ),

        new THREE.Vector3(
          0,
          4.8 + i * .2,
          z - 1
        ),

        new THREE.Vector3(
          10,
          5.8 + i * .2,
          z - 2
        )

      ];

      const wire =
        new THREE.Line(

          new THREE.BufferGeometry()
            .setFromPoints(
              points
            ),

          new THREE.LineBasicMaterial({
            color: 0x070707
          })

        );

      scene.add(wire);

    }

  }

}
