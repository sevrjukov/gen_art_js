import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {Color} from "three";


function shuffleArr(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

const simulated_sales = [
    14270, 8784, 6614, 5407, 4625, 4071, 3655, 3329, 3065, 2847,
    2663, 2506, 2369, 2250, 2144, 2049, 1964, 1887, 1817, 1753,
    1694, 1640, 1589, 1543, 1499, 1459, 1421, 1385, 1351, 1320,
    1290, 1261, 1234, 1209, 1185, 1161, 1139, 1118, 1098, 1079,
    1060, 1043, 1026, 1009, 994, 978, 964, 950, 936, 923,
    910, 898, 886, 874, 863, 852, 842, 832, 822, 812,
    803, 794, 785, 776, 768, 760, 752, 744, 737, 729,
    722, 715, 708, 701, 695, 688, 682, 676, 670, 664,
    658, 653, 647, 642, 637, 631, 626, 621, 616, 612,
    607, 602, 598, 593, 589, 585, 580, 576, 572, 568
];
const scaleFactor = 1400;

// shuffleArr(simulated_sales);


const canvas = document.querySelector('canvas.webgl')

const WIDTH = 1000;
const HEIGHT = 800;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);


const blockWidth = 1;
const blockSpacing = 0.2;
const numBlocks = 100;


for (var i = 0; i < numBlocks; i++) {
    const xIndex = (i % 10);
    const zIndex = (i / 10);
    const boxHeight = simulated_sales[i] / scaleFactor;


    const geometry = new THREE.BoxGeometry(blockWidth, boxHeight, blockWidth);
    const material = new THREE.MeshBasicMaterial({color: "#000000"});

    const box = new THREE.Mesh(geometry, material);

    var geometryLines = new THREE.EdgesGeometry(geometry); // or WireframeGeometry
    var materialLines = new THREE.LineDashedMaterial({color: "#ffffff", linewidth: 1});
    var edges = new THREE.LineSegments(geometryLines, materialLines);
    box.add(edges); // add wireframe as a child of the parent mesh

    positionBox(box, xIndex, zIndex, boxHeight);

}



function positionBox(box, xIndex, zIndex, boxHeight) {
    box.position.y = boxHeight / 2;
    box.position.x = xIndex * (blockWidth + blockSpacing);
    box.position.z = zIndex * (blockWidth + blockSpacing);
    scene.add(box);
}



const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(30, 30, 10);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 100, "#ffb1b1");
// scene.add(gridHelper)


camera.position.set(15, 6, 28);
camera.rotation.set(0, 0.4, 0)

var framesCounter = 100;

function animate() {
    if (framesCounter > 0) {
        requestAnimationFrame(animate);
    }


    framesCounter--;
    // camera.rotation.y += 0.001;
    renderer.render(scene, camera);
    document.getElementById("camera_y").value = camera.rotation.y;
}

animate();