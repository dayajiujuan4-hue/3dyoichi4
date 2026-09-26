import * as THREE from "three";

const steamParticles = [];

export function createSteam(
  scene,
  x,
  z
) {

  const group =
    new THREE.Group();

  for (
    let i = 0;
    i < 10;
    i++
  ) {

    const material =
      new THREE.MeshBasicMaterial({

        color:
          0xd8d8d8,

        transparent:
          true,

        opacity:
          .06,

        depthWrite:
          false

      });

    const particle =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          .15 +
          Math.random() *
          .18,

          8,
          6
        ),

        material

      );

    particle.position.set(

      (Math.random()-.5) *
      .4,

      1 +
      Math.random() *
      1.5,

      (Math.random()-.5) *
      .4

    );

    particle.userData = {

      speed:
        .15 +
        Math.random() *
        .18,

      offset:
        Math.random() *
        Math.PI *
        2

    };

    group.add(particle);

  }

  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);

  steamParticles.push(group);

}


export function updateParticles(
  time
) {

  steamParticles.forEach(
    group => {

      group.children.forEach(
        (particle,index) => {

          particle.position.y +=
            particle.userData.speed *
            .008;

          particle.position.x +=
            Math.sin(
              time +
              particle.userData.offset
            ) *
            .0007;

          if (
            particle.position.y >
            3.2
          ) {

            particle.position.y =
              1;

          }

        }
      );

    }
  );

}
