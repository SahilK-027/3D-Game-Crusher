import { useRapier, RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef } from "react"

export default function Player() {
    const body = useRef();

    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier()
    const rapierWorld = world.raw();

    const jump = () => {
        const origin = body.current.translation();
        origin.y -= 0.31;
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction);
        const hit = rapierWorld.castRay(ray, 10, true);
        if (hit.toi < 0.15) {
            body.current.applyImpulse({ x: 0, y: 3, z: 0 });
        }
    }

    useEffect(() => {
        const unsubscribeJump =  subscribeKeys(
            (state) => {
                return state.jump
            },
            (val) => {
                if (val === true) {
                    jump()
                }
            },
        )

        return () =>{
            unsubscribeJump();
        }
    }, [])

    useFrame((state, delta) => {
        const { forward, backward, right, left } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 1 * delta;
        const torqueStrength = 1 * delta;

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (right) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (left) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);
    })
    return <>
        <RigidBody
            colliders="ball"
            position={[0, 1, 0]}
            restitution={0.2}
            friction={1}
            ref={body}
            mass={.7}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color="mediumpurple" />
            </mesh>
        </RigidBody>
    </>
}