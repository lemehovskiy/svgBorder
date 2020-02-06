import React from 'react';
import SvgBorder from './../SvgBorder/SvgBorder.js';
import styles from './ListItem.module.scss';
import Tilt from 'react-tilt';

const borderConf = [
  '5, 5',
  'calc(100% - 5px), 5',
  'calc(100% - 5px), calc(100% - 30px)',
  'calc(100% - 30px), calc(100% - 5px)',
  '5, calc(100% - 5px)',
  '5, 5'];

export default () => {
    return (
      <Tilt className={styles.root} options={{ max : 15 }}>
        <div className="Tilt-inner">
            <SvgBorder borderConf={borderConf}/>
            sdfsdf
        </div>
      </Tilt>

    );
};