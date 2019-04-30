import React from 'react';

export default function NextQuestion({ goNextQuestion }) {
    return (
            <button className="lb__btn pm0"
                    onClick={goNextQuestion}
            >
                <p className="lb__anchor_txt">Next Question</p>
            </button>
    )
}
