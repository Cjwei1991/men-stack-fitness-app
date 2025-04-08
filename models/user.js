const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
  currentbodyweight: {
    type: Number,
    required: true
  },

  weightTraining: {
    name: {
      type: String,
      enum: ['BenchPress', 'Deadlift', 'Squat']
    },
    weight: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
  },

  bodyWeightTraining: {
    name: {
      type: String,
      enum: ['Pushup', 'Pullup', 'Abs']
    },
    reps: {
      type: Number,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
  },

  cardio: {
    name: {
      type: String,
      enum: ['Treadmills', 'Bikes', 'StairClimbing']
    },
    time: {
      type: Number,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
  },

  note: {
    type: String,
  },

  date: {
    type: Date,

    required: true
  }
});


const userSchema = new mongoose.Schema({
  username: {       
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  workouts: [workoutSchema] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;


