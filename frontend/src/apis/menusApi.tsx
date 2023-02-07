import axios from "axios";
import { baseURL } from "../constants";
import { IMenu } from "../models/menu.model";
import { ICreateMenu } from "../interfaces/menu.interface";

const menuApi = axios.create({
  baseURL: baseURL,
});

export const getMenus = async (): Promise<IMenu> => {
  const response = await menuApi.get("/menus");
  return response.data;
};

export const addMenu = async (menu: ICreateMenu) => {
  const response = await menuApi.post("/menus", menu);
  return response.data;
};
