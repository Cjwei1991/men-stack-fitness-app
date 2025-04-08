const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('workouts/index.ejs', {
            workouts: currentUser.workouts,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => { 
    res.render('workouts/new.ejs');
});

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        
        currentUser.workouts.push(req.body);
      
        await currentUser.save();
        
        res.redirect(`/users/${currentUser._id}/workouts`);
    } catch (error) {
        
        console.log(error);
        res.redirect('/');
    }
});


router.get('/:workoutId', async (req, res) => {
    try {
    
      const currentUser = await User.findById(req.session.user._id);
      
      const workout = currentUser.workouts.id(req.params.workoutId);
   
      res.render('workouts/show.ejs', {
        workout: workout,
        user: currentUser,
      });
    } catch (error) {
     
      console.log(error);
      res.redirect('/');
    }
  });
  
  router.delete('/:workoutId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      
      currentUser.workouts.id(req.params.workoutId).deleteOne();
     
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/workouts`);
    } catch (error) {
      
      console.log(error);
      res.redirect('/');
    }
  });


  router.get('/:workoutId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const workout = currentUser.workouts.id(req.params.workoutId);
      res.render('workouts/edit.ejs', {
        workout: workout,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


  router.put('/:workoutId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      
      const workout = currentUser.workouts.id(req.params.workoutId);
    
      workout.set(req.body);
      
      await currentUser.save();
      // Redirect back to the show view of the current application
      res.redirect(
        `/users/${currentUser._id}/workouts/${req.params.workoutId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


// router logic will go here - will be built later on in the lab

module.exports = router;