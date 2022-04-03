const mongoose = require('mongoose');
// const validator = require('validator');
const slugify = require('slugify');

//Create coffees Mongoose Schema
const coffeeSchema = new mongoose.Schema(
  //Schema definition object
  {
    name: {
      type: String,
      required: [true, 'A coffee must have a name/type'],
      unique: true,
      trim: true,
    },
    slug: String,

    price: {
      type: Number,
      required: [true, 'A coffee must have price'],
    },
    imageCover: {
      type: String,
      required: [true, 'A coffee must have a cover image'],
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  }
);

// Adding (COMPOUND INDEX) using the slug & price fields
coffeeSchema.index({ slug: 1, price: -1 });

coffeeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;
