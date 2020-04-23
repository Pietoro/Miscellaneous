const express = require('express');
const router = express.Router();
const Race = require('../models/Race');

router.get('/', async (request, response) => {
  try {
    const races = await Race.find();
    const racesDto = races.map((race) => ({name: race.name, allowedJobs: race.allowedJobs, _id: race._id}));
    response.status(200).json(racesDto);
  } catch(err) {
    response.status(404).json({message:err});
  }
});

module.exports = router;
