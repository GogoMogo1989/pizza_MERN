const express = require('express');
const router = express.Router();
const DataModel = require('../models/product');

router.post('/', (req, res) => {
  const { file, name, price, description, category } = req.body;

  if (!file || !category) {
    return res.status(400).send('Nincs fájl vagy kategória az adatokban!');
  }

  const data = new DataModel({ file, name, price, description, category });

  data.save()
    .then(() => {
      return res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
    })
    .catch((err) => {
      console.error('Hiba az adatok mentésekor:', err);
      return res.status(500).send('Hiba az adatok mentésekor!');
    });
});

// Termékek lekérdezése
router.get('/', (req, res) => {
  DataModel.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send('Hiba az adatok lekérdezésekor!'));
});

// Termék lekérdezése ID alapján
router.get('/:id', (req, res) => {
  DataModel.findById(req.params.id)
    .then((data) => data ? res.send(data) : res.status(404).send('A keresett adat nem található!'))
    .catch((err) => res.status(500).send('Hiba az adat lekérdezésekor!'));
});

// Termék törlése ID alapján
router.delete('/:id', (req, res) => {
  DataModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Az adat törlése sikeres volt!' }))
    .catch((err) => res.status(500).send('Hiba az adat törlésekor!'));
});

// Termék frissítése ID alapján
router.put('/:id', (req, res) => {
  const updateData = req.body;

  DataModel.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
    .then((updatedData) => updatedData ? res.status(200).send(updatedData) : res.status(404).send('A keresett adat nem található!'))
    .catch((err) => res.status(500).send('Hiba az adat frissítésekor!'));
});

module.exports = router;
