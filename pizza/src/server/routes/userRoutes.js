const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const UserModel = require('../models/userUser');
const sendMail = require('../utils/sendMail')

// User regisztráció
router.post('/registration', async (req, res) => {
  const { username, password, email, phone_number, zip_code, city, address } = req.body;

  if (!username || !password || !email || !phone_number || !zip_code || !city || !address) return res.status(400).send('Hiányzó adatok!');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new UserModel({ username, password: hashedPassword, email, phone_number, zip_code, city, address });
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

// User bejelentkezés
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

// User adatainak lekérdezése
router.get('/', (req, res) => {
  UserModel.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send('Hiba az adminok lekérdezésekor!'));
});

// User adatainak törlése ID alapján
router.delete('/:id', (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Az adat törlése sikeres volt!' }))
    .catch((err) => res.status(500).send('Hiba az adat törlésekor!'));
});

// User adatainak lekérdezése ID alapján
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

// Rendelés frissítése ID alapján
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { username, password, email, phone_number, zip_code, city, address } = req.body;

  if (!username || !password || !email || !phone_number || !zip_code || !city || !address) return res.status(400).send('Hiányzó adatok!');

  try {
    const updatedOrderingData = {
      username,
      password,
      email,
      phone_number,
      zip_code,
      city,
      address,
    };

    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedOrderingData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'A rendelés nem található!' });
    }

    console.log('A felhasználó sikeresen frissítve lett!');
    
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('Hiba a felhasználó frissítésekor:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Hiba a felhasználó frissítésekor!' });
    }
  }
});

module.exports = router;
