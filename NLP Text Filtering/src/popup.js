'use strict';

import './popup.css';

// 设置按钮跳转到options页面
document.getElementById('settingsBtn').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options.html'));
  }
});


window.onload = function () {
  const marqueeContent = document.getElementById("marqueeContent");
  const spanElement = marqueeContent.querySelector(".marquee__content");

  // Get the width of the span element and the width of the window
  const spanWidth = spanElement.offsetWidth;
  const windowWidth = window.innerWidth;

  // Calculate how many copies we need to fill the window width, then double it for infinite scroll effect
  const copiesNeeded = Math.ceil(windowWidth / spanWidth) * 2 + 1;  // Add one more for seamless scrolling

  // Create and append the copies
  for (let i = 0; i < copiesNeeded; i++) {
    const clonedElement = spanElement.cloneNode(true);
    marqueeContent.appendChild(clonedElement);
  }

  // Set the animation duration dynamically based on the total width
  const totalWidth = spanWidth * copiesNeeded;
  const scrollDuration = totalWidth / 500; // adjust this value based on your needs
  marqueeContent.style.animationDuration = `${scrollDuration}s`;
}

function deleteText() {
  var textElement = document.getElementById("deleting");
  var cursorElement = document.getElementById("cursor");
  var text = textElement.textContent;

  if (text.length > 0) {
    text = text.slice(0, -1); // 删除最后一个字符
    textElement.textContent = text;
    setTimeout(deleteText, 700); // 延迟100毫秒后再执行下一个字符的删除
  } else {
    cursorElement.style.visibility = "hidden";
  };
};

deleteText();