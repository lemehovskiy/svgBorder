import React from 'react';
import SvgBorder from './../SvgBorder/SvgBorder.js';
import styles from './ListItem.module.scss';

const borderConf = [
  '5, 5',
  'calc(100% - 5px), 5',
  'calc(100% - 5px), calc(100% - 30px)',
  'calc(100% - 30px), calc(100% - 5px)',
  '5, calc(100% - 5px)',
  '5, 5'];

export default () => {
    return (
        <div className={styles.root}>
            <SvgBorder borderConf={borderConf}/>
              sdfsdf
        </div>
    );
};