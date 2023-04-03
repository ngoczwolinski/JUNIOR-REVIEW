//Error handler
const createError = ({ controller, method, status, err }) => {
  return {
    log: `${controller}.${method} \nERROR: ${err}`,
    status,
    message: {
      err: `Error occured in ${controller}.${method}. Check server logs for more details.`,
    },
  };
};
// Export error handler
module.exports =  createError;

