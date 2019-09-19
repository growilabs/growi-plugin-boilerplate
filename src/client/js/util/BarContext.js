import { customTagUtils } from 'growi-commons';

const { TagContext, ArgsParser, OptionParser } = customTagUtils;

/**
 * Context Object class for $bar()
 */
export default class BarContext extends TagContext {

  /**
   * @param {object|TagContext|BarContext} initArgs
   */
  constructor(initArgs, fromPagePath) {
    super(initArgs);

    this.fromPagePath = fromPagePath;

    // initialized after parse()
    this.isParsed = null;
    this.options = {};
  }

  parse() {
    if (this.isParsed) {
      return;
    }

    const parsedArgs = ArgsParser.parse(this.args);
    this.options = Object.assign(this.options, parsedArgs.options);

    /* example implementation -- from here */
    /* example implementation -- to here */

    this.isParsed = true;
  }

}
