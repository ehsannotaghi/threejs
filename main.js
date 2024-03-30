// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('arContainer');
const arButton = document.getElementById('arButton');

let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Set up OrbitControls to allow user interaction
    const controls = new OrbitControls(camera, renderer.domElement);

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0); // Position the light from above
    scene.add(directionalLight);

    // Set camera position
    camera.position.set(0, 0, 5);

    arButton.addEventListener('click', loadAR);
}

function loadAR() {
    const loader = new GLTFLoader();
    loader.load('japanese_wooden_chair.glb', function (gltf) {
        scene.add(gltf.scene);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
