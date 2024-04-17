import { useState, useEffect } from 'react';

export const useKeyPress = () => {
    const [keyPressed, setKeyPressed] = useState(null);

    useEffect(() => {
        const downHandler = ({ key }) => {
            setKeyPressed(key);
        };

        const upHandler = () => {
            setKeyPressed(null);
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return { keyPressed };
};

export default useKeyPress;