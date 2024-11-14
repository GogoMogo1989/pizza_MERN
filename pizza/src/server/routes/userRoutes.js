const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require('../models/userUser');
const sendMail = require('../utils/sendMail')

// Admin regisztráció
router.post('/registration', async (req, res) => {
  const { username, password, email, phone_number, zip_code, city, address } = req.body;

  if (!username || !password || !email || phone_number || zip_code || city || address) return res.status(400).send('Hiányzó adatok!');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new AdminModel({ username, password: hashedPassword, email });
    await userData.save();

    const userregistrationEmail = {
      from: 'silverland2024@gmail.com',
      to: email,
      subject: 'Sikeres regisztráció!',
      text: `Kedves ${username},\n\nSikeres regisztráció!\n\nÜdvözlettel,\nBest Pizza csapata`
    };
    sendMail(userregistrationEmail);

    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  } catch (err) {
    res.status(500).send('Hiba az adatok mentésekor!');
  }
});

// Admin bejelentkezés
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user|| !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Hiba a bejelentkezés során!');
  }
});

// Adminok adatainak lekérdezése
router.get('/', (req, res) => {
  UserModel.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send('Hiba az adminok lekérdezésekor!'));
});

// Admin adatainak törlése ID alapján
router.delete('/:id', (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Az adat törlése sikeres volt!' }))
    .catch((err) => res.status(500).send('Hiba az adat törlésekor!'));
});

// Admin adatainak lekérdezése ID alapján
router.get('/:id', async (req, res) => {
  try {

    const user = await UserModel.findById(req.params.id);
    
    if (!user) {
      return res.status(404).send('A keresett felhasználó nem található!');
    }
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Hiba az admin adatainak lekérdezésekor!');
  }
});

module.exports = router;
