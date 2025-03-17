import React, { useState } from "react";

export function Counter() {
    const [counter, setCount] = useState(0);

    return (
        <div>
            <button
                onClick={() => {
                    setCount(counter + 1)
                }}
            >
                {counter}
            </button>
        </div>
    )
}