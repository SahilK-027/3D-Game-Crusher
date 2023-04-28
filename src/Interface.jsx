import { useKeyboardControls } from "@react-three/drei"

useKeyboardControls
export default function Interface() {
    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const right = useKeyboardControls((state) => state.right);
    const left = useKeyboardControls((state) => state.left);
    const jump = useKeyboardControls((state) => state.jump);

    return <div className="interFace">
        <div className="time">0.00</div>
        <div className="restart">Restart</div>

        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active' : ''}`}>W</div>
            </div>
            <div className="raw">
                <div className={`key ${left ? 'active' : ''}`}>A</div>
                <div className={`key ${backward ? 'active' : ''}`}>S</div>
                <div className={`key ${right ? 'active' : ''}`}>D</div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ? 'active' : ''}`}>SPACE</div>
            </div>
        </div>
    </div>
}