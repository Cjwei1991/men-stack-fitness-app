const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const alltUsers = await User.find({});

        res.render('users/users_index.ejs', {
            users: alltUsers,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        const maxWeight = {
            BenchPress: 0,
            Deadlift: 0,
            Squat: 0,
        };

        const maxBodyReps = {
            Pushup: 0,
            Pullup: 0,
            Abs: 0,
        };

        const maxCardioCalories = {
            Treadmills: 0,
            Bikes: 0,
            StairClimbing: 0,
        };

        user.workouts.forEach(w => {
            const wt = w.weightTraining;
            if (wt?.name && wt.weight && wt.weight > maxWeight[wt.name]) {
                maxWeight[wt.name] = wt.weight;
            }

            const bw = w.bodyWeightTraining;
            if (bw?.name && bw.reps && bw.reps > maxBodyReps[bw.name]) {
                maxBodyReps[bw.name] = bw.reps;
            }

            const cd = w.cardio;
            if (cd?.name && cd.calories && cd.calories > maxCardioCalories[cd.name]) {
                maxCardioCalories[cd.name] = cd.calories;
            }
        });

        res.render('users/user_show.ejs', {
            user,
            maxWeight,
            maxBodyReps,
            maxCardioCalories
        });

    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Show details of a single workout session
router.get('/:userId/workouts/:workoutId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const workout = user.workouts.id(req.params.workoutId);
      res.render('users/user_workout_show.ejs', { user, workout });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  });
    

// router logic will go here - will be built later on in the lab

module.exports = router;