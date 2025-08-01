"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOrderModel = exports.NewOrderSchema = exports.FoodMenueModel = exports.FoodMenueSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.FoodMenueSchema = new mongoose_1.default.Schema({
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
exports.FoodMenueModel = mongoose_1.default.models.Menue || mongoose_1.default.model('Menue', exports.FoodMenueSchema);
exports.NewOrderSchema = new mongoose_1.default.Schema({
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
exports.NewOrderModel = mongoose_1.default.models.OrderCart || mongoose_1.default.model('OrderCart', exports.NewOrderSchema);
