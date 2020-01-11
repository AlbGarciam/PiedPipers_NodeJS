/* eslint-disable no-await-in-loop */
import axios from 'axios';
import * as data from './locals.json';

const auth = '';
const endpoint = '';
const route = () => `http://${endpoint}/local`;
const { locals } = data;

const fill = async items => {
  for (let i = 0; i < items.length; i += 1) {
    const element = items[i];
    const url = route();
    console.log(url);
    const response = await axios.post(url, element, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    });
    console.log(response);
  }
};

fill(locals);
