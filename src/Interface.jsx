import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "./stores/useGame";


useKeyboardControls
export default function Interface() {
    const time = useRef();

    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const right = useKeyboardControls((state) => state.right);
    const left = useKeyboardControls((state) => state.left);
    const jump = useKeyboardControls((state) => state.jump);

    const restart = useGame((state) => state.restart);
    const phase = useGame((state) => state.phase);

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState();
            let elapsedTime = 0

            if (state.phase === 'playing')
                elapsedTime = Date.now() - state.startTime
            else if (state.phase === 'ended')
                elapsedTime = state.endTime - state.startTime

            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);

            if(time.current){
                time.current.textContent = elapsedTime;
            }
        })

        return () => {
            unsubscribeEffect();
        }
    }, [])

    const handleClick = () => {
        window.location.reload(true);
    }

    return <div className="interFace">
        <div ref={time} className="time">0.00</div>
        {phase === 'ended' && <div className="win">You Win</div>}
        {phase === 'ended' && <div className="restart">
            <button className="restartButton" onClick={handleClick}>
                Play Again!
            </button>
        </div>}

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