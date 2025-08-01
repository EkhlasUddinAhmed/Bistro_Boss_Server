"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenueService = void 0;
const Menue_Model_1 = require("./Menue.Model");
const getAllMenuesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Menue_Model_1.FoodMenueModel.find();
    return result;
});
const createNewItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Menue_Model_1.FoodMenueModel.create(payload);
    return result;
});
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Menue_Model_1.NewOrderModel.create(payload);
    return result;
});
const getItemsFromCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Menue_Model_1.NewOrderModel.find({
        userEmail: payload === null || payload === void 0 ? void 0 : payload.email,
    });
    return result;
});
const deleteOrderedItemFromCart = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Menue_Model_1.NewOrderModel.findByIdAndDelete(_id);
    return result;
});
exports.MenueService = {
    getAllMenuesFromDB,
    createOrderIntoDB,
    getItemsFromCart,
    deleteOrderedItemFromCart,
    createNewItemIntoDB,
};
