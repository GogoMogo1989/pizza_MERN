const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes'); 

// Middleware
app.use(cors());
app.use(express.json({ limit: '500mb' }));

// MongoDB kapcsolat
mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => console.log('A MongoDB adatbázishoz sikeresen kapcsolódva!'))
  .catch((error) => console.log('Hiba a MongoDB adatbázis kapcsolat során:', error));

// Route-ok beállítása
app.use('/api/data', productRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/userorder', orderRoutes);

// Szerver indítása
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`A szerver fut a ${port} porton!`));
