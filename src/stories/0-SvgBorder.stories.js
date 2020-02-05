import React from 'react';
import SvgBorder from '../components/SvgBorder/SvgBorder';

export default {
  title: 'SvgBorder',
  component: SvgBorder,
};

export const ToStorybook = () => <SvgBorder>sdfsdf</SvgBorder>;

ToStorybook.story = {
  name: 'SvgBorder',
};
