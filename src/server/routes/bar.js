const loggerFactory = require('@alias/logger');

const logger = loggerFactory('growi-plugin:boilerplate:routes:bar:author');

module.exports = (crowi) => {
  const express = crowi.require('express');
  const router = express.Router();

  const Page = crowi.model('Page');

  /**
   * return an Attachment model
   */
  router.get('/author', async(req, res) => {
    const { pagePath } = req.query;
    // eslint-disable-next-line no-unused-vars
    const options = JSON.parse(req.query.options);

    if (pagePath == null) {
      res.status(400).send('the param \'pagePath\' must be set.');
      return;
    }

    const page = await Page.findOne({ path: pagePath }).populate('creator');

    // not found
    if (page == null) {
      res.status(404).send(`pagePath: '${pagePath}' is not found or forbidden.`);
      return;
    }

    logger.info('found: ', page);

    res.status(200).send({ author: page.creator });
  });

  return router;
};
