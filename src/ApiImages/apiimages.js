const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const upload = multer({ dest: 'uploads/' });

router.get('/:name', async (req, res) => {
  const { name } = req.params;
  res.sendFile(process.cwd() + '/images/' + name + '.jpg');
});

router.post('/', upload.single('file'), (req, res) => {
  try {
    const { name } = req.body;
    const tempPath = req.file.path;
    const extension = path.extname(req.file.originalname);
    const targetPath = path.join(process.cwd() + '/images/' + name + '.jpg');

    fs.rename(tempPath, targetPath, err => {
      if (err) {
        console.error('Error al mover el archivo:', err);
        res.status(500).json({ error: 'Error al mover el archivo' });
      } else {
        res.json('Imagen guardada correctamente');
      }
    });
  } catch (error) {
    console.error('Error en la API: /', error);
    res.status(500).json({ error: 'Error en la API' });
  }
});


module.exports = router;