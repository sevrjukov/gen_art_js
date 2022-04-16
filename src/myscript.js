const WIDTH = 1000;
const HEIGHT = 800;
const scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);


const blockW = 1;
const blockSpacing = 0.5;
const numBlocks = 10;


for (var i = 1; i <= numBlocks; i++) {
    const xIndex = (i % 10);
    const zIndex = (i / 10);

    const boxHeight = 3 / i;
    const boxGeometry = new THREE.BoxGeometry(blockW, boxHeight, blockW);
    const boxMaterial = new THREE.MeshStandardMaterial({color: "#e7dd17"})
    const box = new THREE.Mesh(boxGeometry, boxMaterial)

    positionBox(box, xIndex, zIndex, boxHeight);

}

function positionBox(box, xIndex, zIndex, boxHeight) {
    box.position.x = xIndex * (blockW + blockSpacing);
    box.position.z = zIndex * (blockW + blockSpacing);
    box.position.y = boxHeight / 2;
    scene.add(box);
}

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(15, 15, 15);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 100, "#ffb1b1");
scene.add(gridHelper)


camera.position.set(-7, 7, 25);
camera.rotation.set(0, -0.8, 0)


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();