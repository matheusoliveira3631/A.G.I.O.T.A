const logger = (req, res, next) => {
    const start = Date.now(); // Start time for the request
  
    // Log when the route is called
    console.log("============================================================");
    console.log(`[${new Date().toISOString()}] Route Called: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log("Body:", req.body);

  
    // Hook into the response lifecycle to log the status and duration
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] Route Response: ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
      console.log("Responde body:");
      console.dir(res.body);
    });

    console.log("============================================================");

  
    next(); // Pass control to the route logic
  };
  
  export default logger;
  