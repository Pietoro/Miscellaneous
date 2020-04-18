const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');

//GET
router.get('/', async (request, response) => {
  try {
    const units = await Unit.find();
    response.json(units);
  } catch(err) {
    response.json({message:err});
  }
});

router.get('/:unitId', async (request, response) => {
  try {
    const unit = await Unit.findById(request.params.unitId);
    response.json(unit);
  } catch(err) {
    response.json({message: err});
  }
});

//POST
router.post('/', (request, response) => {
  const unit = new Unit({
    name: request.body.name,
    race: request.body.race,
    job: request.body.job,
    level: request.body.level,
    equipment: request.body.equipment
  });
  console.log(unit);
  
  unit.save()
    .then(data => response.json(data))
    .catch(err => {
      response.json({ message: err})
    });
});

//DELETE
router.delete('/:unitId', async (request, response) => {
  try {
  const removedUnit = await Unit.remove({_id: request.params.unitId});
  response.json(removedUnit);
  } catch(err) {
    response.json({message: err});
  }
});

//UPDATE
router.patch('/:unitId', async (request, response) => {
  try {
  const updatedUnit = await Unit.updateOne(
    {_id: request.params.unitId},
    {$set: {
      name: request.body.name,
      job: request.body.job }
    });
  response.json(updatedUnit);
  } catch(err) {
    response.json({message: err});
  }
});

module.exports = router;