const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');

router.post('/', async (req, res) => {
    const { name, originalName } = req.body;
    console.log("Originalname " + originalName);
    console.log("name " + name);
    if (name !== originalName) {
        const oldImagePath = path.join(process.cwd(), 'images', originalName + '.jpg');
        const newImagePath = path.join(process.cwd(), 'images', name + '.jpg');
        fs.rename(oldImagePath, newImagePath, (err) => {
            if (err) {
                console.error('Error al renombrar la imagen:', err);
                return res.status(500).json({ error: 'Error al renombrar la imagen' });
            }
            res.status(200).json('ok');
        });
    } else {
        res.status(200).json('ok');
    }
});

router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    const imagePath = path.join(process.cwd(), 'images', name + '.jpg');
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error al eliminar la imagen:', err);
            return res.status(500).json({ error: 'Error al eliminar la imagen' });
        }
        res.status(200).json("ok");
    });

});

module.exports = router;
