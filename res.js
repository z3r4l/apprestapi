'use strict';

exports.ok = (values, res) => {
  let data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};
