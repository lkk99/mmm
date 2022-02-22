import React from 'react';
let list = [];

export function addList(value) {
  let falg = true;
  if (list.length) {
    list.map(item => {
      if (item.id == value.id) {
        falg = false;
        return;
      }
    });
    if (falg) {
      list = [...list, value];
    }
  } else {
    list = [...list, value];
  }
}
export function delList(value) {
  list.map((item, index) => {
    if (item.id == value) {
      list.splice(index, 1);
    }
  });
}
let loginTag = null;
export function changeLogin(value) {
  loginTag = value;
}

export {loginTag};
export {list};
