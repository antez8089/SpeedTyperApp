import { useEffect } from "react";

function KeyboardButton({ value, id }) {
    return (
        <div className="button" id={id}>{value}</div>
    );
}

function Keyboard() {

    useEffect(() => {

        const buttons = document.querySelectorAll('.button');

        const buttonMap = new Map();
        buttons.forEach((button) => {
            buttonMap.set(button.innerHTML.toLowerCase(), button);
        });
        buttonMap.set(' ', document.querySelector('#space'));

        document.addEventListener('keydown', (e) => {
            let button = buttonMap.get(e.key.toLowerCase());
            if (button) {
                button.classList.add("active");
            }
        });

        document.addEventListener('keyup', (e) => {
            let button = buttonMap.get(e.key.toLowerCase());
            if (button) {
                button.classList.remove("active");
            }
        });
    }, []);


    return (
        <div className="keyboard">
            <div className="row">
                <KeyboardButton value="Q" />
                <KeyboardButton value="W" />
                <KeyboardButton value="E" />
                <KeyboardButton value="R" />
                <KeyboardButton value="T" />
                <KeyboardButton value="Y" />
                <KeyboardButton value="U" />
                <KeyboardButton value="I" />
                <KeyboardButton value="O" />
                <KeyboardButton value="P" />
            </div>
            <div className="row">
                <KeyboardButton value="A" />
                <KeyboardButton value="S" />
                <KeyboardButton value="D" />
                <KeyboardButton value="F" />
                <KeyboardButton value="G" />
                <KeyboardButton value="H" />
                <KeyboardButton value="J" />
                <KeyboardButton value="K" />
                <KeyboardButton value="L" />
            </div>
            <div className="row">
                <KeyboardButton value="Z" />
                <KeyboardButton value="X" />
                <KeyboardButton value="C" />
                <KeyboardButton value="V" />
                <KeyboardButton value="B" />
                <KeyboardButton value="N" />
                <KeyboardButton value="M" />
            </div>
            <div className="row">
                <KeyboardButton value="" id="space" />
            </div>
        </div>
    );
}

export default Keyboard;
