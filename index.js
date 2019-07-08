import {format} from './src/utils';
import assign from './src/assign';
import defaults from './src/options';

var maskInput;
var maskOpt;

export default {
  update: function(el, binding, vnode) {
    const obj = binding.value;
    const value = obj.value ? obj.value : 0;
    var positionFromEnd = value.length - maskInput.selectionEnd;
    vnode.context.data.value = format(value, maskOpt);
    positionFromEnd = Math.max(positionFromEnd, maskOpt.suffix.length); // right
    positionFromEnd = value.length - positionFromEnd;
    positionFromEnd = Math.max(positionFromEnd, maskOpt.prefix.length + 1); // left
  },
  bind: function(el, binding) {
    // --------------- GRAB INPUT ONCE
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      var els = el.getElementsByTagName('input')
      if (els.length !== 1) {
        // throw new Error("v-money requires 1 input, found " + els.length)
      } else {
        maskInput = els[0];
      }
    }
    // --------------- GRAB OPTIONS ONCE
    maskOpt = assign(defaults, binding.value.opt);
  }
};