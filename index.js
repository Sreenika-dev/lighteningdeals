const express = require('express');
const bodyParser = require('body-parser');
const LightningDeal = require('./lightningDeal');

const app = express();
app.use(express.json());


app.post('/deals', async (req, res) => {
  try {
    const lightningDeal = new LightningDeal(req.body);
    await lightningDeal.save();
    res.status(201).send(lightningDeal);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/deals', async (req, res) => {
  try {
    const lightningDeals = await LightningDeal.find({
      expiryTime: { $gt: new Date() },
      availableUnits: { $gt: 0 },
      approved: true
    });
    res.status(200).send(lightningDeals);
}
    catch (error) {
        res.status(500).send(error);
        }
        });
        
        
        app.get('/deals/:id', async (req, res) => {
        try {
        const lightningDeal = await LightningDeal.findById(req.params.id);
        if (!lightningDeal) {
        res.status(404).send();
        } else {
        res.status(200).send(lightningDeal);
        }
        } catch (error) {
        res.status(500).send(error);
        }
        });
        
        
        app.patch('/deals/:id', async (req, res) => {
        const allowedUpdates = ['productName', 'actualPrice', 'finalPrice', 'totalUnits', 'availableUnits', 'expiryTime', 'approved'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
        }
        
        try {
        const lightningDeal = await LightningDeal.findById(req.params.id);
        if (!lightningDeal) {
        return res.status(404).send();
        }
        
        updates.forEach((update) => lightningDeal[update] = req.body[update]);
        await lightningDeal.save();
        
        res.status(200).send(lightningDeal);
        } catch (error) {
        res.status(400).send(error);
        }
        });
        
        
        app.delete('/deals/:id', async (req, res) => {
        try {
        const lightningDeal = await LightningDeal.findByIdAndDelete(req.params.id);
        if (!lightningDeal) {
        return res.status(404).send();
        }
        
        res.status(200).send(lightningDeal);
        } catch (error) {
        res.status(500).send(error);
        }
        });
        
        
        app.patch('/deals/:id/approve', async (req, res) => {
        try {
        const lightningDeal = await LightningDeal.findById(req.params.id);
        if (!lightningDeal) {
        return res.status(404).send();
        }
        
        lightningDeal.approved = true;
        await lightningDeal.save();
        
        res.status(200).send(lightningDeal);
        } catch (error) {
        res.status(500).send(error);
        }
        });
        
        
        app.post('/deals/:id/orders', async (req, res) => {
        try {
        const lightningDeal = await LightningDeal.findById(req.params.id);
        if (!lightningDeal) {
        return res.status(404).send();
        }
        
        if (!lightningDeal.approved) {
          return res.status(400).send({ error: 'Cannot place an order for an unapproved lightning deal' });
        }
        
        if (lightningDeal.availableUnits === 0) {
          return res.status(400).send({ error: 'No units available for the lightning deal' });
        }
        
        lightningDeal.availableUnits--;
        await lightningDeal.save();
        
        res.status(200).send(lightningDeal);
        } catch (error) {
        res.status(500).send(error);
        }
        });
        
        
        app.get('/orders/:id', async (req, res) => {

            const lightningDeal = await LightningDeal.findById(req.params.id);
            res.status(200).send("Order Succesfully placed");
            
        });
    
        
       const Port = process.env.PORT || 3000
        app.listen(Port, () => {
        console.log(`Server running on port ${Port}`);
        });
        
        
        
        
        
