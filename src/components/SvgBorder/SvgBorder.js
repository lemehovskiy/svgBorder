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

const SvgBorder = (props) => {
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

    const parsedConfig = parseConfig(props.borderConf);

    const polylinePoints = helpers.getPolylinePoints({
        parsedConfig: parsedConfig,
        elementSize: size
    })

    const elementProps = {
        points: polylinePoints,
        fill: props.fill,
        stroke: props.stroke,
        strokeWidth: props.strokeWidth
    }

    return (
        <div className={styles.wrapper} ref={componentRef}>
            <svg className={styles.root}>
                {props.type === 'polygon' && <polygon {...elementProps}/>}
                {props.type === 'polyline' && <polyline {...elementProps}/>}
            </svg>
            {props.children}
        </div>
    );
};

export default SvgBorder;

SvgBorder.defaultProps = {
    stroke: 'black',
    fill: 'none',
    strokeWidth: '3',
    type: 'polygon'
};
