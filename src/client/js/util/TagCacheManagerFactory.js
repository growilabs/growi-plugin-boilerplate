import { TagCacheManager } from 'growi-commons';

const STATE_CACHE_NS = 'foobar-state-cache';

let _instance;
export default class TagCacheManagerFactory {

  static getInstance() {
    if (_instance == null) {
      // create generateCacheKey implementation
      const generateCacheKey = (fooOrBarContext) => {
        return `${fooOrBarContext.method}__${fooOrBarContext.args}`;
      };

      _instance = new TagCacheManager(STATE_CACHE_NS, generateCacheKey);
    }

    return _instance;
  }

}
