const errorHandler = (err, req, res, next) => {
    console.error(err); 
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
  
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
  };
  
module.exports = errorHandler;