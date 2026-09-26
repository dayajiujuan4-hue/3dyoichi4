import * as THREE from "three";

function textureFromText(
  text,
  background,
  color,
  vertical = false
) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    vertical
      ? 256
      : 512;

  canvas.height =
    vertical
      ? 768
      : 160;

  const ctx =
    canvas.getContext("2d");

  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.strokeStyle =
    "#e7aa43";

  ctx.lineWidth =
    10;

  ctx.strokeRect(
    6,
    6,
    canvas.width - 12,
    canvas.height - 12
  );

  ctx.fillStyle =
    color;

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.font =
    "bold 72px Microsoft YaHei";

  if (!vertical) {

    ctx.fillText(
      text,
      canvas.width / 2,
      canvas.height / 2
    );

  } else {

    const characters =
      [...text];

    const gap =
      canvas.height /
      (characters.length + 1);

    characters.forEach(
      (character,index) => {

        ctx.fillText(
          character,
          canvas.width / 2,
          gap *
          (index + 1)
        );

      }
    );

  }

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;

}


export function createHorizontalSign(
  text
) {

  const texture =
    textureFromText(
      text,
      "#7c1111",
      "#ffd56c"
    );

  return new THREE.Mesh(

    new THREE.PlaneGeometry(
      3,
      .8
    ),

    new THREE.MeshStandardMaterial({

      map: texture,

      emissive:
        0x551100,

      emissiveIntensity:
        1.2

    })

  );

}


export function createVerticalSign(
  group,
  x,
  y,
  z,
  text,
  side
) {

  const texture =
    textureFromText(
      text,
      "#8d1010",
      "#ffe070",
      true
    );

  const sign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        .75,
        2.6
      ),

      new THREE.MeshStandardMaterial({

        map:
          texture,

        emissive:
          0xaa2200,

        emissiveIntensity:
          1.2

      })

    );

  sign.position.set(
    x,
    y,
    z
  );

  sign.rotation.y =
    side === "left"
      ? Math.PI / 2
      : -Math.PI / 2;

  group.add(sign);

}
