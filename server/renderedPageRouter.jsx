import React from 'react';
import { renderToString } from 'react-dom/server';
import Router from 'express';

import HelloWorld from '../src/HelloWorld';
import template from './template';

const renderedPageRouter = new Router();

renderedPageRouter.get('*', (req, res) => {
  const initialState = { addressee: 'Universe' };
  const html = renderToString(<HelloWorld {...initialState} />);
  res.send(template(html, initialState));
});

export default renderedPageRouter;
