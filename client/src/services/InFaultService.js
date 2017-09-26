import store from "../store";

function getItemsInFault(state) {
  return state.faultItems;
}

function isInFault(item) {
  return currentItemsInFault.includes(item);
}

let currentItemsInFault;
let itemsListening = {};

function handleChange() {
  let previousItemsInFault = currentItemsInFault;
  currentItemsInFault = getItemsInFault(store.getState());

  if (previousItemsInFault !== currentItemsInFault) {
    Object.keys(itemsListening).map(item => {
      itemsListening[item](isInFault(item));
      return item;
    });
  }
}

store.subscribe(handleChange);

export function stopListening(item) {
  delete itemsListening[item];
}

export function listen(item, checkImmediately, cb) {
  if (checkImmediately) {
    cb(isInFault(item));
  }
  if (item && cb) {
    itemsListening[item] = cb;
    return () => {
      stopListening(item);
    };
  }
}
