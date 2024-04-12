const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');

// Middleware to handle JSON data and static files
server.use(middlewares);

// Middleware to handle file uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });

// Custom route to handle file uploads
server.post('/upload', upload.single('file'), (req, res) => {
  // Handle file upload logic here
  res.json({ message: 'File uploaded successfully' });
});

// You can define custom routes here if needed
// For example:
// server.get('/custom-route', (req, res) => {
//   // Handle custom route logic here
//   res.json({ message: 'Custom route response' });
// });

// Use default router
server.use(router);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
