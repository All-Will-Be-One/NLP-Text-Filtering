'use strict';

import $ from 'jquery';
import { blockPageTypes } from './blockPageTypes.js';
import { prepareRegex } from './blockFunction.js';
import { block_blacklist } from './blockFunction.js';

// Define jQuery's :containsRegex selector
$.expr[":"].containsRegex = $.expr.createPseudo(function (arg) {
  const regexp = new RegExp(arg, 'i');
  return function (elem) {
    return regexp.test($(elem).text());
  };
});

chrome.storage.sync.get(['blacklist'], function (result) {
  let blacklist = JSON.parse(result.blacklist || "[]");
  const prepArray = prepareRegex(blacklist, blockPageTypes);
  block_blacklist(prepArray);

  let running = false;
  const observer = new MutationObserver(function (mutationsList, observer) {
    if (!running) {
      running = true;
      requestAnimationFrame(function () {
        block_blacklist(prepArray);
        running = false;
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
