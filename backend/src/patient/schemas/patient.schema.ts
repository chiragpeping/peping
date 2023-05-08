import * as mongoose from 'mongoose';


const mealplan = new mongoose.Schema({
  mealhtml: String,
  time: String,
  type: String
}, { timestamps: true });

const guideline = new mongoose.Schema({
  guidehtml: String,

}, { timestamps: true });

const plandate = new mongoose.Schema({
  start: Date,
  end: Date,
  public: Boolean,
  mealplan: [mealplan],
  guideline: [guideline],
 
} );

export const PatientSchema = new mongoose.Schema({
  age: Number,
  complaints: String,
  email: String,
  height: Number,
  name: String,
  phone: String,
  weight: Number,
  plandate: [plandate]

}, { timestamps: true })

