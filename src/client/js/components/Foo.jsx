import React from 'react';
import PropTypes from 'prop-types';

import FooContext from 'growi-plugin-boilerplate/src/client/js/util/FooContext';
import TagCacheManagerFactory from 'growi-plugin-boilerplate/src/client/js/util/TagCacheManagerFactory';

// eslint-disable-next-line no-unused-vars
import styles from '../../css/foo.css';

export default class Foo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
    };

    this.tagCacheManager = TagCacheManagerFactory.getInstance();
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillMount() {
    const { fooContext } = this.props;

    // get state object cache
    const stateCache = this.tagCacheManager.getStateCache(fooContext);

    // check cache exists
    if (stateCache != null) {
      // restore state
      this.setState({
        ...stateCache,
      });

      return; // go to render()
    }

    // parse
    try {
      fooContext.parse();
    }
    catch (err) {
      await this.setState({
        errorMessage: err.toString(),
      });

      // store to sessionStorage
      this.tagCacheManager.cacheState(fooContext, this.state);

      return;
    }
  }

  render() {
    // show error
    if (this.state.errorMessage != null) {
      return (
        <div className="text-warning">
          <i className="fa fa-exclamation-triangle fa-fw"></i>
          {this.props.fooContext.tagExpression} (-&gt; <small>{this.state.errorMessage}</small>)
        </div>
      );
    }

    const { fooContext } = this.props;

    const exampleMessage = fooContext.getExampleMessage();
    const range = fooContext.getOptRange();

    const text = `range: ${range.start} - ${range.end}`;
    return <div className="foo"><strong>{exampleMessage}</strong> - {text}</div>;
  }

}

Foo.propTypes = {
  appContainer: PropTypes.object.isRequired,
  fooContext: PropTypes.instanceOf(FooContext).isRequired,
};
