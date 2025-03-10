import express from 'express';
import ky from 'ky';
import proj4 from 'proj4';

const router = express.Router();

proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

// Get the list of ALL stations
router.get('/stations', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "v1.1/StaEntVigiCru.json").json();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data: ' + error });
    }
});

// Get all data from ONE station
router.get('/station/:code', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "observations.json?CdStationHydro=" + req.params.code).json();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data: ' + error });
    }
});

// Get the geo coordinates of a specific station
router.get('/station/coord/:code', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "StaEntVigiCru.json?CdEntVigiCru=" + req.params.code + "&TypEntVigiCru=7").json();

        const lambertX = parseFloat(response.ListEntVigiCru[0].CoordXStationHydro);
        const lambertY = parseFloat(response.ListEntVigiCru[0].CoordYStationHydro);

        // Conversion from Lambert 93 to WGS84
        const wgs84Coords = proj4("EPSG:2154", 'EPSG:4326', [lambertX, lambertY]);

        const result = {
            stationCode: req.params.code,
            stationName: response.ListEntVigiCru[0].LbEntVigiCru,
            coord: wgs84Coords
        }

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while retrieving data: ' + error });
    }
});

// Optional route just... because
// Get all data from ONE territory
router.get('/territory/:code', async (req, res) => {
    try {
        const response = await ky.get(process.env.API_URL + "v1.1/TerEntVigiCru.json" + "?CdEntVigiCru=" + req.params.code + "&TypEntVigiCru=5").json();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving data: ' + error });
    }
});



export default router;