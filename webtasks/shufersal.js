'use latest';

import request from 'request-promise';

module.exports = function (ctx, req, res) {
  request({
    url: `https://www.shufersal.co.il/_layouts/Shufersal_Pages/AutoComplete.aspx?searchText`,
    qs: { searchText: ctx.data.searchText }
  })
    .then(result => res.end(result))
    .catch(err =>  res.status(500).send(err));
};

// deploy url: https://wt-5711b34372219c82f526ab6867bff806-0.run.webtask.io/shufersal
