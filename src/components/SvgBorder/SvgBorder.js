import React, {useEffect, useRef, useState} from 'react';
import { parseConfig } from '../../utils/parseCssValues';
import helpers from '../../utils/helpers';
import styles from './SvgBorder.module.scss';


const useResize = (myRef) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const handleResize = () => {
    setWidth(myRef.current.offsetWidth)
    setHeight(myRef.current.offsetHeight)
  }

  useEffect(() => {
    myRef.current && myRef.current.addEventListener('resize', handleResize)

    return () => {
      myRef.current.removeEventListener('resize', handleResize)
    }
  }, [myRef.current])

  console.log(width);

  return { width, height }
}

export default (props) => {
  const componentRef = useRef()
  const { width, height } = useResize(componentRef)


  console.log(width);
  console.log(height);


  // useEffect(() => {
  //   const width = ref.current ? ref.current.offsetWidth : 0;
  //   const height = ref.current ? ref.current.offsetHeight : 0;
  //   console.log('width', width);
  //   console.log('height', height);
  // }, [ref.current]);

  const conf = ['100%, calc(100% - 100px)', '100px, 100%'];
  const parsedConfig = parseConfig(conf);

  // const polylinePoints = helpers.getPolylinePoints({
  //   pointsConfig: parsedConfig,
  //   elementHeight: 100,
  //   elementWidth: 100
  // });


  // console.log(polylinePoints);


  return (
    <div className={styles.wrapper} ref={componentRef}>
      <p>width: {width}px</p>
      <p>height: {height}px</p>
      {props.children}
    </div>
  );
};
