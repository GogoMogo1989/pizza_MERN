const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const AdminModel = require('../models/adminUser');
const sendMail = require('../utils/sendMail')

// Admin regisztráció
router.post('/registration', async (req, res) => {
  const { username, password, email, masterKey } = req.body;

  if (masterKey !== process.env.ADMIN_SECRET_KEY) return res.status(403).send('Hibás admin master key!');
  if (!username || !password || !email) return res.status(400).send('Hiányzó adatok!');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminData = new AdminModel({ username, password: hashedPassword, email });
    await adminData.save();

    const adminregistrationEmail = {
      from: 'silverland2024@gmail.com',
      to: email,
      subject: 'Sikeres regisztráció!',
      text: `Kedves ${username},\n\nSikeres regisztráció!\n\nÜdvözlettel,\nBest Pizza csapata`
    };
    sendMail(adminregistrationEmail);

    res.status(200).send('Adatok sikeresen fogadva és mentve a szerveren.');
  } catch (err) {
    res.status(500).send('Hiba az adatok mentésekor!');
  }
});

// Admin bejelentkezés
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).send('Hiba a bejelentkezés során!');
  }
});

// Adminok adatainak lekérdezése
router.get('/', (req, res) => {
  AdminModel.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send('Hiba az adminok lekérdezésekor!'));
});

// Admin adatainak törlése ID alapján
router.delete('/:id', (req, res) => {
  AdminModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Az adat törlése sikeres volt!' }))
    .catch((err) => res.status(500).send('Hiba az adat törlésekor!'));
});

// Admin adatainak lekérdezése ID alapján
router.get('/:id', async (req, res) => {
  try {

    const admin = await AdminModel.findById(req.params.id);
    
    if (!admin) {
      return res.status(404).send('A keresett felhasználó nem található!');
    }
    
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).send('Hiba az admin adatainak lekérdezésekor!');
  }
});

// Admin frissítése ID alapján
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { username, password, email, masterKey } = req.body;

  if (masterKey !== process.env.ADMIN_SECRET_KEY) return res.status(403).send('Hibás admin master key!');
  if (!username || !password || !email ) return res.status(400).send('Hiányzó adatok!');
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedAdminData = {
      username,
      password: hashedPassword,
      email,
    };

    const updatedAdmin = await AdminModel.findByIdAndUpdate(id, updatedAdminData, { new: true, runValidators: true });

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'A admin nem található!' });
    }

    console.log('A admin felhasználó sikeresen frissítve lett!');
    
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('Hiba az admin felhasználó frissítésekor:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Hiba az admin felhasználó frissítésekor!' });
    }
  }
});

module.exports = router;
