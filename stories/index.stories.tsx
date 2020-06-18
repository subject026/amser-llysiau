import React from 'react';

import { action } from '@storybook/addon-actions';
import Button from '../src/App/components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const Icon = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

Text.story = {
  name: 'text button',
};

Icon.story = {
  name: 'icon button',
};
