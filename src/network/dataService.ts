import axios from 'axios';
import './axiosConfig';
let dataService = {
  getListBook: (data?: any) => {
    let url = 'book/book';
    return axios.get(url, {
      params: {
        typeList: 'list',
        type: 'manga',
        offset: 0,
        limit: 10,
        testApp: 117,
        ...data,
      },
    });
  },
  getRank: () => {
    let url =
      'book/book?limit=6&offset=0&col=views_day&order=DESC&typeList=category&type=manga&testApp=12';
    return axios.get(url);
  },
  getChap: (data?: any) => {
    let url = 'book/manga';
    return axios.get(url, {
      params: {
        typeList: 'manga',
        testApp: 17,
        ...data,
      },
    });
  },
  readPost: (data?: any) => {
    let url = 'book/manga';
    return axios.get(url, {
      params: {
        id: 128,
        typeDetail: 'detail',
        order: 1029,
        testApp: 17,
        ...data,
      },
    });
  },
  getCategories: (data?: any) => {
    let url = '/book/category?type_category=2&typeList=menu&testApp=12';
    return axios.get(url);
  },
  getBookByCategory: (data?: any) => {
    let url =
      '/book/book?limit=15&offset=0&col=modified&order=DESC&typeList=category&type=manga&arrayCategory=27&testApp=12';
    return axios.get(url, {
      params: {
        id: 128,
        typeDetail: 'detail',
        order: 1029,
        testApp: 17,
        ...data,
      },
    });
  },
  searchBook: (data?: any) => {
    let url = 'book/search?typeList=book&typeSearch=search&testApp=12';
    return axios.get(url, {
      params: {
        ...data,
      },
    });
  },
};
export default dataService;
