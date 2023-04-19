import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three'
import { useState, useRef , useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

/**
 * 
 * @param {*} param0 
 * @returns Newly created Box geometry for start ground
 */
export function BlockStart({ positionProp = [0, 0, 0] }) {
    return (
        <group position={positionProp}>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                position={[0, - 0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
        </group>
    );
}
/**
 * 
 * @param {*} param0 
 * @returns Newly created Box geometry for 2nd block with spinning trap
 */
export function BlockSpinner({ positionProp = [0, 0, 0] }) {
    const obstacle = useRef();
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })
    return (
        <group position={positionProp}>
            {/* FLOOR */}
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, - 0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            {/* SPINNER */}
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    );
}

/**
 * 
 * @param {*} param0 
 * @returns Newly created Box geometry for 2nd block with wll trap moving up and down
 */
export function BlockVerticle({ positionProp = [0, 0, 0] }) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const y_axis = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: positionProp[0], y: positionProp[1] + y_axis, z: positionProp[2] });
    })
    return (
        <group position={positionProp}>
            {/* FLOOR */}
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, - 0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            {/* SPINNER */}
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[3.5, 0.3, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    );
}

/**
 * 
 * @param {*} param0 
 * @returns Newly created Box geometry for 2nd block with wll trap moving left and right
 */
export function BlockAxe({ positionProp = [0, 0, 0] }) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const x_axis = Math.sin(time + timeOffset) * 1.25;
        obstacle.current.setNextKinematicTranslation({ x: positionProp[0] + x_axis, y: positionProp[1] + 0.75, z: positionProp[2] });
    })
    return (
        <group position={positionProp}>
            {/* FLOOR */}
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                position={[0, - 0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow
            />
            {/* SPINNER */}
            <RigidBody
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacle}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    scale={[1.5, 1.5, 0.3]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
        </group>
    );
}

/**
 * 
 * @param {*} param0 
 * @returns Newly created Box geometry for end ground
 */
export function BlockEnd({ positionProp = [0, 0, 0] }) {
    const pin1 = useGLTF('./bowlingPin.glb');
    const pin2 = useGLTF('./bowlingPin2.glb');
    const pin3 = useGLTF('./bowlingPin3.glb');
    const pin4 = useGLTF('./bowlingPin4.glb');
    const pin5 = useGLTF('./bowlingPin5.glb');
    const pin6 = useGLTF('./bowlingPin6.glb');
    pin1.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })
    pin2.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })
    pin3.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })
    pin4.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })
    pin5.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })
    pin6.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    })

    return (
        <group position={positionProp}>
            <RigidBody type='fixed'>
                <mesh
                    geometry={boxGeometry}
                    material={floor1Material}
                    position={[0, 0.05, 0]}
                    scale={[4, 0.2, 4]}
                    receiveShadow
                />
            </RigidBody>

            <RigidBody position={[0, 0.15, 0.7]}>
                <primitive object={pin1.scene} scale={3} />
            </RigidBody>

            <RigidBody position={[0.3, 0.15, 0.2]}>
                <primitive object={pin2.scene} scale={3} />
            </RigidBody>

            <RigidBody position={[-0.3, 0.15, 0.2]}>
                <primitive object={pin3.scene} scale={3} />
            </RigidBody>

            <RigidBody position={[-0.6, 0.15, -0.3]}>
                <primitive object={pin4.scene} scale={3} />
            </RigidBody>

            <RigidBody position={[0, 0.15, -0.3]}>
                <primitive object={pin5.scene} scale={3} />
            </RigidBody>

            <RigidBody position={[0.6, 0.15, -0.3]}>
                <primitive object={pin6.scene} scale={3} />
            </RigidBody>

        </group>
    );
}

export function Level({count = 5, types = [BlockSpinner, BlockVerticle, BlockAxe]}) {
    const blocks = useMemo(()=>{
        const blocks = [];
        for(let i = 0; i < count ;i++){
            const type = types[ Math.floor(Math.random() * types.length)];
            blocks.push(type);
        }
        return blocks;
    }, [count, types])
    return <>
        <BlockStart positionProp={[0, 0, 0]} />
        { blocks.map((Block, index) => <Block key={ index } positionProp={ [ 0, 0, - (index + 1) * 4 ] } />) }
        <BlockEnd positionProp={[0, 0, -(count+1)*4]} />
    </>
}