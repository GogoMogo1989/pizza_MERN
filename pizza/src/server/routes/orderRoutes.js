const express = require('express');
const router = express.Router();
const OrderingModel = require('../models/ordering');
const sendMail = require('../utils/sendMail');


// Rendelés leadása
router.post('/', async (req, res) => {
  const { type_of_paid, type_of_delivery, ordered_data, user_id, name, price, email, phone_number, zip_code, city, address } = req.body;

  if (!type_of_paid || !type_of_delivery || !user_id || !ordered_data || !name || !price || !email || !phone_number || !zip_code || !city || !address) {
    return res.status(400).json({ error: 'Hiányzó adatok!' });
  }

  const generateOrderNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const orderNumber = generateOrderNumber();

  try {
    const orderingData = new OrderingModel({
      name,
      price,
      email,
      phone_number,
      zip_code,
      city,
      address,
      ordered_data,
      order_number: orderNumber,
      is_active: true,
      user_id,
      type_of_paid,
      type_of_delivery
    });

    await orderingData.save();
    console.log('A rendelés mentése sikeres volt!');
    
    res.status(201).json({ message: 'Rendelés sikeresen feladva', orderNumber });

    const sendToOrder = {
      from: 'silverland2024@gmail.com',
      to: email,
      subject: 'Rendelés visszaigazolása',
      text: `Kedves ${name},\n\nKöszönjük a rendelésed! A rendelési számod: ${orderNumber}.\n\nItt találhatóak a rendelési adatok:\n\n` +
        `- Név: ${name}\n` +
        `- Ár: ${price}\n` +
        `- Telefon szám: ${phone_number}\n` +
        `- Irányítószám: ${zip_code}\n` +
        `- Város: ${city}\n` +
        `- Cím: ${address}\n` +
        `- Rendelési adatok: ${ordered_data.map(item => `\n    - Termék neve: ${item.product_name}, Mennyiség: ${item.quantity}`).join('')}\n` +
        `- Fizetési mód: ${type_of_paid}\n` +
        `- Szállítási mód: ${type_of_delivery}\n\n` +
        `Üdvözlettel,\nBest Pizza csapata`
    };

    const sendToAdmin = {
      from: 'silverland2024@gmail.com',
      to: 'silverland2024@gmail.com',
      subject: 'Új rendelés érkezett!',
      text: `Kedves Admin,\n\nÚj rendelés érkezett, a rendelés száma: ${orderNumber}.\n\nÜdvözlettel, Best Pizza`
    };

    sendMail(sendToOrder);
    sendMail(sendToAdmin);

  } catch (err) {
    console.error('Hiba a rendelés mentésekor:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Hiba a rendelés mentésekor!' });
    }
  }
});

// Rendelések lekérdezése
router.get('/', (req, res) => {
  OrderingModel.find({})
    .then(data => {
      console.log('A rendelések lekérdezése sikeres volt!');
      res.status(200).json(data);
    })
    .catch(err => {
      console.error('Hiba a rendelések lekérdezésekor:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Hiba a rendelések lekérdezésekor!' });
      }
    });
});

// Rendelés frissítése ID alapján
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { type_of_paid, type_of_delivery, user_id, is_active, ordered_data, name, price, email, phone_number, zip_code, city, address, order_number } = req.body;

  try {
    const updatedOrderingData = {
      name,
      price,
      email,
      phone_number,
      zip_code,
      city,
      address,
      ordered_data,
      order_number,
      is_active,
      user_id,
      type_of_paid,
      type_of_delivery
    };

    const updatedOrdering = await OrderingModel.findByIdAndUpdate(id, updatedOrderingData, { new: true, runValidators: true });

    if (!updatedOrdering) {
      return res.status(404).json({ error: 'A rendelés nem található!' });
    }

    console.log('A rendelés sikeresen frissítve lett!');
    
    // Küldd el a választ először
    res.status(200).json(updatedOrdering);

    if (!is_active) {
      const orderEditEmail = {
        from: 'silverland2024@gmail.com',
        to: email,
        subject: 'Sikeres frissítés!',
        text: `Kedves ${name},\n\nRendelésedet sikeresen frissítettük! A rendelési számod: ${order_number}.\n\nItt találhatóak a rendelési adatok:\n\n` +
          `- Név: ${name}\n` +
          `- Ár: ${price}\n` +
          `- Telefon szám: ${phone_number}\n` +
          `- Irányítószám: ${zip_code}\n` +
          `- Város: ${city}\n` +
          `- Cím: ${address}\n` +
          `- Rendelési adatok: ${ordered_data.map(item => `\n    - Termék neve: ${item.product_name}, Mennyiség: ${item.quantity}`).join('')}\n` +
          `- Fizetési mód: ${type_of_paid}\n` +
          `- Szállítási mód: ${type_of_delivery}\n\n` +
          `Üdvözlettel,\nBest Pizza csapata`
      };
      
      sendMail(orderEditEmail);
    }

  } catch (err) {
    console.error('Hiba a rendelés frissítésekor:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Hiba a rendelés frissítésekor!' });
    }
  }
});

// Rendelés törlése ID alapján
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  OrderingModel.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) {
        return res.status(404).json({ error: 'A rendelés nem található!' });
      }
      console.log('Rendelés törlése sikeres volt!');
      res.status(200).json({ message: 'A rendelés törlése sikeres volt!' });
    })
    .catch(err => {
      console.error('Hiba a rendelés törlésekor:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Hiba a rendelés törlésekor!' });
      }
    });
});

// Rendelés elérése ID alapján
router.get('/:id', (req, res) => {
  const id = req.params.id;
  OrderingModel.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({ error: 'A keresett rendelés nem található!' });
      }
      res.status(200).json(data);
    })
    .catch(err => {
      console.error('Hiba a rendelés lekérdezésekor:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Hiba a rendelés lekérdezésekor!' });
      }
    });
});

// Rendelés elkészült státusz
router.get('/done/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const data = await OrderingModel.findById(id);

    if (!data) {
      return res.status(404).json({ error: 'A keresett rendelés nem található!' });
    }

    const orderDoneEmail = {
      from: 'silverland2024@gmail.com',
      to: data.email,
      subject: 'Rendelésed elkészült!',
      text: `Kedves ${data.name},\n\nRendelésed sikeresen elkészült! A rendelési számod: ${data.order_number}.\n\nItt találhatóak a rendelési adatok:\n\n` +
        `- Név: ${data.name}\n` +
        `- Ár: ${data.price}\n` +
        `- Telefon szám: ${data.phone_number}\n` +
        `- Irányítószám: ${data.zip_code}\n` +
        `- Város: ${data.city}\n` +
        `- Cím: ${data.address}\n` +
        `- Rendelési adatok: ${data.ordered_data.map(item => `\n    - Termék neve: ${item.product_name}, Mennyiség: ${item.quantity}`).join('')}\n` +
        `- Fizetési mód: ${data.type_of_paid}\n` +
        `- Szállítási mód: ${data.type_of_delivery}\n\n` +
        `Üdvözlettel,\nBest Pizza csapata`
    };

    sendMail(orderDoneEmail);
    res.status(200).json({ message: 'A rendelés elkészült státusza frissítve lett és email értesítő küldve.' });

  } catch (err) {
    console.error('Hiba a rendelés elkészült státuszának frissítésekor:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Hiba a rendelés elkészült státuszának frissítésekor!' });
    }
  }
});

module.exports = router;
