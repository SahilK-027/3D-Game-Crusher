import { Physics, Debug } from '@react-three/rapier'
import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import Player from './Player.jsx'

export default function Experience() {
    return <>
        <Physics>
            <Lights />
            <Level />
            <Player />
        </Physics>
    </>
}