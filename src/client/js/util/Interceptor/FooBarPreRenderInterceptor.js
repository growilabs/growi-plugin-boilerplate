import { customTagUtils, BasicInterceptor } from 'growi-commons';

import TagCacheManagerFactory from '../TagCacheManagerFactory';


const TAG_PATTERN = /foo|bar/;

/**
 * The interceptor for refs
 *
 *  replace refs tag to a React target element
 */
export default class FooBarPreRenderInterceptor extends BasicInterceptor {

  /**
   * @inheritdoc
   */
  isInterceptWhen(contextName) {
    return (
      contextName === 'preRenderHtml'
      || contextName === 'preRenderPreviewHtml'
    );
  }

  /**
   * @inheritdoc
   */
  isProcessableParallel() {
    return false;
  }

  /**
   * @inheritdoc
   */
  async process(contextName, ...args) {
    const context = Object.assign(args[0]); // clone
    const parsedHTML = context.parsedHTML;
    this.initializeCache(contextName);

    const result = customTagUtils.findTagAndReplace(TAG_PATTERN, parsedHTML);

    context.parsedHTML = result.html;
    context.tagContextMap = result.tagContextMap;

    return context;
  }

  /**
   * initialize cache
   *  when contextName is 'preRenderHtml'         -> clear cache
   *  when contextName is 'preRenderPreviewHtml'  -> doesn't clear cache
   *
   * @param {string} contextName
   */
  initializeCache(contextName) {
    if (contextName === 'preRenderHtml') {
      TagCacheManagerFactory.getInstance().clearAllStateCaches();
    }
  }

}
