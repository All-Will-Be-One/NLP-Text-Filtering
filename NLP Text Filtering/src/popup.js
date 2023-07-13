'use strict';

import './popup.css';

import { pageTypes } from './blockPageTypes.js';
import { pageTypesCN } from './blockPageTypes.js';

let blacklistDiv = document.getElementById('blacklist');
let keywordInput = document.getElementById('keywordInput');
let addBtn = document.getElementById('addBtn');

function refreshBlacklist() {
  // 清空现有列表
  while (blacklistDiv.firstChild) {
    blacklistDiv.firstChild.remove();
  }

  chrome.storage.sync.get(['blacklist'], function (result) {
    let blacklist = JSON.parse(result.blacklist || "[]");

    // 重新添加每个关键词
    blacklist.forEach(function (entry, index) {
      let item = document.createElement('div');

      let keyword = document.createElement('span');
      keyword.innerText = entry.keyword;
      item.appendChild(keyword);

      // 添加是否正则的checkbox
      let isRegexpCheckbox = document.createElement('input');
      isRegexpCheckbox.type = 'checkbox';
      isRegexpCheckbox.checked = entry.isRegexp;
      isRegexpCheckbox.addEventListener('change', function () {
        entry.isRegexp = this.checked;
        chrome.storage.sync.set({ 'blacklist': JSON.stringify(blacklist) });
      });
      item.appendChild(isRegexpCheckbox);
      item.appendChild(document.createTextNode(' 正则 '));

      // 添加每个页面类型的checkbox
      pageTypes.forEach(function (pageType) {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = entry[pageType];
        checkbox.addEventListener('change', function () {
          entry[pageType] = this.checked;
          chrome.storage.sync.set({ 'blacklist': JSON.stringify(blacklist) });
        });
        item.appendChild(checkbox);
        item.appendChild(document.createTextNode(' ' + pageTypesCN[pageType] + ' '));
      });

      let removeBtn = document.createElement('button');
      removeBtn.innerText = '🗑️';
      removeBtn.addEventListener('click', function () {
        // 在 blacklist 中删除该关键词
        blacklist.splice(index, 1);
        chrome.storage.sync.set({ 'blacklist': JSON.stringify(blacklist) });

        // 重新显示 blacklist
        refreshBlacklist();
      });
      item.appendChild(removeBtn);

      blacklistDiv.appendChild(item);
    });
  });
}

addBtn.addEventListener('click', function () {
  let keyword = keywordInput.value;
  if (keyword) {
    chrome.storage.sync.get(['blacklist'], function (result) {
      let blacklist = JSON.parse(result.blacklist || "[]");

      // 添加关键词到 blacklist
      let newEntry = {
        keyword: keyword,
        isRegexp: false,
      };

      pageTypes.forEach(function (pageType) {
        newEntry[pageType] = true;
      });

      blacklist.push(newEntry);
      chrome.storage.sync.set({ 'blacklist': JSON.stringify(blacklist) });

      // 重新显示 blacklist
      refreshBlacklist();

      // 清空输入框
      keywordInput.value = '';
    });
  }
});

// 显示初始的 blacklist
refreshBlacklist();