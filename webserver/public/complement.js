//Code example from https://popmotion.io/pure/ with no modification - the modifications have been done in 
//class names in complement.html to match the class names here. Complement.html main code is also copied from the example there
//const popmotion = require("popmotion");
const { styler, timeline, listen, easing } = window.popmotion;
console.log(window);

const openModalButton = document.querySelector('.open-modal');
const cancelModalButton = document.querySelector('.modal-cancel');
const okModalButton = document.querySelector('.modal-ok');

const modalShade = styler(document.querySelector('.modal-shade'));
const modalContainer = styler(document.querySelector('.modal-container'));
const modal = styler(document.querySelector('.modal'));
const modalSections = Array.from(document.querySelector('.modal').children).map(styler);
const sectionLabels = modalSections.map((s, i) => 'section' + i);

const tweenUp = (track, duration = 500, yFrom = 100) => ({
  track,
  duration,
  from: { y: yFrom, opacity: 0 },
  to: { y: 0, opacity: 1 },
  ease: { y: easing.backOut, opacity: easing.linear }
});

const setStylers = (v) => {
  if (v.shade !== undefined) modalShade.set('opacity', v.shade);
  if (v.modal !== undefined) modal.set(v.modal);
  sectionLabels.forEach((label, i) => {
    if (v[label] !== undefined) modalSections[i].set(v[label])
  });
};

const showContainers = () => {
  modalShade.set('display', 'block');
  //modalShade.set('display', 'block');
  modalContainer.set('display', 'flex');
};

const hideContainers = () => {
  modalShade.set('display', 'none');
  modalContainer.set('display', 'none');
};

const openModal = () => {
  showContainers();
  
  timeline([
    { track: 'shade', from: 0, to: 1, ease: easing.linear },
    '-100',
    tweenUp('modal'),
    '-200',
    [...modalSections.map((s, i) => tweenUp(sectionLabels[i], 300, 50)), 50]
  ]).start(setStylers);
}

const cancelModal = () => {
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: 100, opacity: 0 },
      ease: { y: easing.easeIn, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 200 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}

const okModal = () => {
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: -200, opacity: 0 },
      ease: { y: easing.easeOut, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 300 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}

listen(openModalButton, 'click').start(openModal);
listen(cancelModalButton, 'click').start(cancelModal);
listen(okModalButton, 'click').start(okModal);

//  This is end of popmotion example code

document
  .querySelector(".request-complement")
  .addEventListener("click", function() {
    fetch("/complement")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        document.querySelector(".complement").innerText = data.complement;
      })
      .catch(function(err) {
        console.error(err);
      });
  });