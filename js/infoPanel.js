// infoPanel.js
import { DOM } from './dom.js';
import { rmLabel } from './ui.js';

export function popOut() {
  const popped = !DOM.infoToggle.checked;
  DOM.infoTab.classList.toggle('poppedout', popped);
  DOM.centerPrimary.classList.toggle('minimized', popped);
  DOM.popoutIndicator.classList.toggle('down', popped);
  DOM.popLabel.classList.toggle('active', popped);
  DOM.clickSpace.classList.toggle('disabled', DOM.infoToggle.checked);

  rmLabel();
}

export function clickToReturn() {
  DOM.infoToggle.checked = true;
  DOM.infoTab.classList.toggle('poppedout', !DOM.infoToggle.checked);
  DOM.centerPrimary.classList.toggle('minimized', !DOM.infoToggle.checked);
  DOM.popoutIndicator.classList.toggle('down', !DOM.infoToggle.checked);
  DOM.popLabel.classList.remove("active");
  DOM.navMenu.classList.remove('nav-menu-open');
  setTimeout(() => {
    DOM.clickSpace.classList.toggle('disabled', DOM.infoToggle.checked);
  }, 10);
}