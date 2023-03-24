import axios from "axios";
import { baseURL } from "../../constants";
import { IMenu, IMenus } from "../models/menu.model";
import { ICreateMenu } from "../interfaces/menu.interface";
import { QueryObserverResult, useQuery } from "react-query";

const menuApi = axios.create({
  baseURL: baseURL,
});

export const getMenus = async (): Promise<IMenus> => {
  const response = await menuApi.get("/menus");
  return response.data;
};

export const addMenu = async (menu: ICreateMenu): Promise<IMenu> => {
  const response = await menuApi.post("/menus", menu);
  return response.data;
};

const queryMenuItem = async (id: string): Promise<IMenu> => {
  const response = await menuApi.get(`/menus/${id}`);
  return response.data;
};

export const getMenuById = (id: string): QueryObserverResult<IMenu> => {
  return useQuery<IMenu, Error>(["menu", id], async () => queryMenuItem(id), {
    staleTime: 1000000,
    cacheTime: 1000000,
    onSuccess: (res) => {
      return {
        data: res.data,
        isSuccess: res.isSucess,
      };
    },
    onError: (err) => {
      return err.message;
    },
  });
};
