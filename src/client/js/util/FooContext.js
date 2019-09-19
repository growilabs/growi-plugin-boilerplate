import { customTagUtils } from 'growi-commons';

const { TagContext, ArgsParser, OptionParser } = customTagUtils;

/**
 * Context Object class for $foo()
 */
export default class FooContext extends TagContext {

  /**
   * @param {object|TagContext|FooContext} initArgs
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

    /*
     * example implementation -- start
     */
    // require range option
    if (this.options.range == null) {
      throw new Error('set \'range\' option. e.g. \'range=1:10\'');
    }
    // init exampleMessage
    this.exampleMessage = 'FooContext has been parsed!';
    /*
     * example implementation -- end
     */

    this.isParsed = true;
  }

  getExampleMessage() {
    return this.exampleMessage;
  }

  getOptRange() {
    if (this.options.range === undefined) {
      return undefined;
    }
    return OptionParser.parseRange(this.options.range);
  }

}
