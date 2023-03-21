import axios from "axios";
import { baseURL } from "../constants";
import { IMenu, IMenus } from "../models/menu.model";
import { ICreateMenu } from "../interfaces/menu.interface";

const menuApi = axios.create({
  baseURL: baseURL,
});

export const getMenus = async (): Promise<IMenus> => {
  const response = await menuApi.get("/menus");
  return response.data;
};

export const addMenu = async (menu: ICreateMenu) => {
  const response = await menuApi.post("/menus", menu);
  return response.data;
};

export const getMenuById = (id: string): Promise<IMenu> => {
  return menuApi.get(`/menus/${id}`);
};
