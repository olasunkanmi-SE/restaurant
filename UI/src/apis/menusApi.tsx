import axios from "axios";
<<<<<<<< HEAD:UI/src/apis/menusApi.tsx
import { baseURL } from "../../constants";
========
import { baseURL } from "../constants";
>>>>>>>> 3b4a01a982d6b122a1521ce46526b5df6dea17cc:frontend/src/apis/menusApi.tsx
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
