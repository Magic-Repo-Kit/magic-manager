
// 进入动画【左->右】
export const fallLRIn = {
  // from: { transform: 'translateX(-100%)'},
  // to: { transform: 'translateX(0)'},
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: {
    duration: 500,
    easing: (t) => t * (2 - t),
  },
};

