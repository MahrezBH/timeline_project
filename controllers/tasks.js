var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');
var Metier = require('../models/metier');
/* tache Routes */
/**
 * GET /tasks
 * Purpose the all tasks
 */
router.get('/', function(req, res, next) {
  Task.find((err, data ) => {
    res.json(data);
  })
});

/**
 * Post /tasks
 * Purpose : create a  tasks
 */

router.post('/add', function (req, res, next) {
  // we want to create a new tasks and return the new tasks
 //let _id = req.body._id;
  let title = req.body.title;
  let description = req.body.description;
  let zone = req.body.zone;
   

  let newTask = new Task({
    title, description,zone
  });
  newTask.save().then((taskDoc) =>{
    // the full list document is returned (incl.id)
    res.send(taskDoc);
  })
});

/**
 * PUSH /tasks/:id
 * Purpose : update a specified tasks  tasks
 */
 router.patch ('/:_id', function (req, res, next) {
  // we want to update the specified tasks
  Task.findOneAndUpdate({ id: req.params._id },{
      $set: req.body
  }).then(() => {
      res.sendStatus(200);
  });
});

 /**
 * DELETE /tasks/:id
 * Purpose : create a  tasks
 */
  router.delete('/:_id', function (req, res, next) {
    // we want to delete a specified  tasks 
    Task.findOneAndRemove({ id: req.params._id },{
        $set: req.body
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
  }); 

/**
   * Get /tasks/:taskId/metier
   * Pupose: Get all metier in specific
   */
 router.get('/:taskId/metier',function (req, res, next) {
  // we want te return all metier that belong to a specific list (specified by listId)
Metier.find({
  _taskId: req.params.taskId
}).then((metier) => {
  res.send(metier);
}) 

});

router.post('/:taskId/metier', function (req, res, next) {
  //we want to create a new metier in a task specified by  taskId
  let newMetier = new Metier({
      title: req.body.title,
      _taskId: req.params.taskId
  });
  newMetier.save().then((newMetierDoc) => {
      res.send(newMetierDoc);
  })
})
/**
 * PATCH /tasks/:taskId/metier/:metierId
 * Purpose: Update an existing metier
 */
router.patch('/:taskId/metier/:metierId', function (req,res, next) {
  Metier.findOneAndUpdate({
      _id: req.params.metierId,
      _taskId: req.params.taskId
  }, {
      $set: req.body
  }).then(() => {
      res.sendStatus(200);
  })
});

/**
 * DELETE /task/:taskId/metier/:metierId
 * PURPOSE: Delete an existing metier 
 */
 router.delete('/:taskId/metier/:metierId', function (req, res, next) {
  Metier.findOneAndRemove({
      _id: req.params.metierId,
      _taskId: req.params.taskId
  }).then((removedMetierDoc) => {
      res.send(removedMetierDoc);
  })
});

const TaskRouter = router
module.exports = TaskRouter;
