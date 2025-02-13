import express from 'express';
import ky from 'ky';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "v1.1/TerEntVigiCru.json").json();
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data' });
    }
});

router.get('/territory/:code', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "v1.1/TerEntVigiCru.json" + "?CdEntVigiCru=" + req.params.code + "&TypEntVigiCru=5").json();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data' });
    }
});

router.get('/station/:code', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "observations.json?CdStationHydro=" + req.params.code).json();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data' });
    }
});


export default router;