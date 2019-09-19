import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-unresolved
import axios from 'axios'; // import axios from growi dependencies

import BarContext from '../util/BarContext';
import TagCacheManagerFactory from '../util/TagCacheManagerFactory';

// eslint-disable-next-line no-unused-vars
import styles from '../../css/bar.css';


export default class Bar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoaded: false,
      isError: false,
      errorMessage: null,

      currentPageAuthor: null,
    };

    this.tagCacheManager = TagCacheManagerFactory.getInstance();
  }

  // eslint-disable-next-line react/no-deprecated
  async componentWillMount() {
    const { barContext } = this.props;

    // get state object cache
    const stateCache = this.tagCacheManager.getStateCache(barContext);

    // check cache exists
    if (stateCache != null) {
      // restore state
      this.setState({
        ...stateCache,
        isLoading: false,
      });

      return; // go to render()
    }

    // parse
    try {
      barContext.parse();
    }
    catch (err) {
      await this.setState({
        isError: true,
        errorMessage: err.toString(),
      });

      // store to sessionStorage
      this.tagCacheManager.cacheState(barContext, this.state);

      return;
    }

    this.loadContents();
  }

  async loadContents() {
    const { barContext } = this.props;
    const { fromPagePath } = barContext;

    let res;
    try {
      this.setState({ isLoading: true });

      res = await axios.get('/_api/plugin/bar/author', {
        params: {
          pagePath: fromPagePath,
          options: JSON.stringify(barContext.options),
        },
      });

      this.setState({
        isLoaded: true,
        currentPageAuthor: res.data.author.username,
      });
    }
    catch (err) {
      this.setState({
        isError: true,
        errorMessage: err.response.data,
      });

      return;
    }
    finally {
      await this.setState({ isLoading: false });

      // store to sessionStorage
      this.tagCacheManager.cacheState(barContext, this.state);
    }

  }

  renderContents() {
    const { barContext } = this.props;

    if (this.state.isLoading) {
      return (
        <div className="text-muted">
          <i className="fa fa-spinner fa-pulse mr-1"></i>
          <span className="bar-blink">Retrieving the author of this page..</span>
        </div>
      );
    }
    if (this.state.errorMessage != null) {
      return (
        <div className="text-warning">
          <i className="fa fa-exclamation-triangle fa-fw"></i>
          {barContext.tagExpression} (-&gt; <small>{this.state.errorMessage}</small>)
        </div>
      );
    }

    if (this.state.isLoaded) {
      const { currentPageAuthor } = this.state;

      return (
        <React.Fragment>
          <i className="icon-information" />
          The author of this page is <strong>&quot;{currentPageAuthor}&quot;</strong>.
        </React.Fragment>
      )
    }
  }

  render() {
    return <div className="bar">{this.renderContents()}</div>;
  }

}

Bar.propTypes = {
  appContainer: PropTypes.object.isRequired,
  barContext: PropTypes.instanceOf(BarContext).isRequired,
};
