import React from 'react';
import ReactDOM from 'react-dom';

import { BasicInterceptor } from 'growi-commons';

import FooContext from '../FooContext';
import BarContext from '../BarContext';

import Foo from '../../components/Foo';
import Bar from '../../components/Bar';

/**
 * The interceptor for refs
 *
 *  render React DOM
 */
export default class FooBarPostRenderInterceptor extends BasicInterceptor {

  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
  }

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'postRenderHtml'
      || contextName === 'postRenderPreviewHtml'
    );
  }

  /**
   * @inheritdoc
   */
  process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone

    // forEach keys of tagContextMap
    Object.keys(context.tagContextMap).forEach((domId) => {
      const elem = document.getElementById(domId);

      if (elem) {
        const tagContext = context.tagContextMap[domId];

        if (tagContext.method === 'foo') {
          // instanciate FooContext from TagContext
          const fooContext = new FooContext(tagContext || {}, context.currentPagePath);
          this.renderFoo(fooContext, elem);
        }

        if (tagContext.method === 'bar') {
          // instanciate FooContext from TagContext
          const barContext = new BarContext(tagContext || {}, context.currentPagePath);
          this.renderBar(barContext, elem);
        }

      }
    });

    return Promise.resolve();
  }

  renderFoo(fooContext, elem) {
    ReactDOM.render(
      <Foo appContainer={this.appContainer} fooContext={fooContext} />,
      elem,
    );
  }

  renderBar(barContext, elem) {
    ReactDOM.render(
      <Bar appContainer={this.appContainer} barContext={barContext} />,
      elem,
    );
  }

}
