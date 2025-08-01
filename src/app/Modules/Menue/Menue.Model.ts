import mongoose from 'mongoose';
import { TFoodMenue } from './Menue.Interface';

export const FoodMenueSchema = new mongoose.Schema<TFoodMenue>({
  name: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const FoodMenueModel =
  mongoose.models.Menue || mongoose.model('Menue', FoodMenueSchema);

export const NewOrderSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

export const NewOrderModel =
  mongoose.models.OrderCart || mongoose.model('OrderCart', NewOrderSchema);
