import { useState } from "react";

const DT = 0.01; // Seconds
const SHOW_TIME = 5.5; // Seconds

enum GameState {
    NOT_STARTED,
    STARTED,
    ENDED,
}

function App() {
    const [counter, setCounter] = useState(0);
    const [currentInterval, setCurrentInterval] = useState(0);
    const [gameState, setGameState] = useState<GameState>(
        GameState.NOT_STARTED
    );

    const startCounter = () => {
        const interval = setInterval(() => {
            setCounter((countdown) => Number((countdown + DT).toFixed(2)));
        }, DT * 1000);

        setCurrentInterval(interval);
    };

    const handleClick = () => {
        switch (gameState) {
            case GameState.NOT_STARTED: {
                setGameState(GameState.STARTED);
                startCounter();
                break;
            }
            case GameState.STARTED: {
                setGameState(GameState.ENDED);
                clearInterval(currentInterval);
                break;
            }
            case GameState.ENDED: {
                setGameState(GameState.NOT_STARTED);
                setCounter(0);
                break;
            }
            default:
                break;
        }
    };

    return (
        <>
            <img src="./logo.svg" style={{ margin: 10 }} />

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={handleClick}
            >
                {gameState == GameState.ENDED && <h2>Your Score:</h2>}

                {(gameState == GameState.ENDED || counter <= SHOW_TIME) && (
                    <h1>
                        {!(gameState == GameState.ENDED)
                            ? Math.floor(counter)
                            : counter}
                    </h1>
                )}
                {gameState == GameState.NOT_STARTED && <h2>Click to start</h2>}
            </div>
        </>
    );
}

export default App;
