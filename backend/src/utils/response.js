exports.success = (
  res,
  message,
  data = null,
  meta = undefined,
  status = 200
) => {
  let response = {
    success: true,
    message,
    data
  };

  // Auto-detect meta jika tidak diberikan
  if (meta !== undefined) {
    response.meta = meta;
  } else if (Array.isArray(data)) {
    response.meta = { count: data.length };
  }

  return res.status(status).json(response);
};

exports.error = (
  res,
  message,
  error = null,
  status = 500
) => {
  return res.status(status).json({
    success: false,
    message,
    error
  });
};