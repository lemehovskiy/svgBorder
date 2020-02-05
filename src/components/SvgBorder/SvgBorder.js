import React, {useEffect, useRef, useState} from 'react';
import {parseConfig} from '../../utils/parseCssValues';
import helpers from '../../utils/helpers';
import styles from './SvgBorder.module.scss';


const useEventListener = (target, type, listener, ...options) => {
    React.useEffect(
        () => {
            const targetIsRef = target.hasOwnProperty("current");
            const currentTarget = targetIsRef ? target.current : target;
            if (currentTarget)
                currentTarget.addEventListener(type, listener, ...options);
            return () => {
                if (currentTarget)
                    currentTarget.removeEventListener(type, listener, ...options);
            };
        },
        [target, type, listener, options]
    );
};

export default (props) => {
    const componentRef = useRef(null)
    const [size, setSize] = useState({ width: 0, height: 0 });

    function handleResize() {
        setSize({
            width: componentRef.current.offsetWidth,
            height: componentRef.current.offsetHeight
        })
    }

    useEffect(() => {
        handleResize();
    }, [])

    useEventListener(window, "resize", handleResize);

    const conf = ['100%, calc(100% - 100px)', '100px, 100%'];
    const parsedConfig = parseConfig(conf);

    const polylinePoints = helpers.getPolylinePoints({
        parsedConfig: parsedConfig,
        elementSize: size
    })

    console.log(polylinePoints);

    return (
        <div className={styles.wrapper} ref={componentRef}>
            <p>width: {size.width}px</p>
            <p>height: {size.height}px</p>
            {props.children}
        </div>
    );
};
