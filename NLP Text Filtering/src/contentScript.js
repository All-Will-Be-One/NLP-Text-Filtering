'use strict';

import $ from 'jquery';
import { blockPageTypes } from './blockPageTypes.js';
import { prepareRegex } from './blockFunction.js';
import { block_blacklist } from './blockFunction.js';
import { block_duration } from './blockRules/blockDuration.js';

// Define jQuery's :containsRegex selector
$.expr[":"].containsRegex = $.expr.createPseudo(function (arg) {
  const regexp = new RegExp(arg, 'i');
  return function (elem) {
    return regexp.test($(elem).text());
  };
});

chrome.storage.sync.get(['blacklist', 'minDuration'], function (result) {
  //keywords
  let blacklist = JSON.parse(result.blacklist || "[]");
  const prepArray = prepareRegex(blacklist, blockPageTypes);
  block_blacklist(prepArray);

  //duration
  let minDuration = (result.minDuration || 0);
  block_duration(minDuration);

  let running = false;
  const observer = new MutationObserver(function (mutationsList, observer) {
    if (!running) {
      running = true;
      requestAnimationFrame(function () {
        block_blacklist(prepArray);
        block_duration(minDuration);
        running = false;
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
