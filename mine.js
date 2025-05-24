document.addEventListener('DOMContentLoaded', () => {
  const iLoveYouContainer = document.getElementById('i-love-you-container');
  const textChars = document.querySelectorAll('.text-char');
  const heartShape = document.querySelector('.heart-shape');

  const blopBurst = new mojs.Burst({
    parent: iLoveYouContainer,
    radius: { 0: 75 },
    count: 8,
    children: {
      shape: 'circle',
      fill: { 'deeppink': '#FCE4A6' },
      radius: 'rand(10, 20)',
      duration: 1000,
      delay: 'rand(0, 150)',
      easing: 'quad.out',
      strokeWidth: 5,
      stroke: 'white',
      pathScale: 'rand(.5, 1.5)',
      isForce3d: true
    },
    isTimelineLess: true
  });

  const mainTimeline = new mojs.Timeline({ delay: 500 });

  textChars.forEach((char, index) => {
    const charTween = new mojs.Tween({
      duration: 800,
      easing: mojs.easing.sin.out,
      onUpdate: (progress) => {
        const translateY = (1 - progress) * 50;
        char.style.transform = `translateY(${translateY}px)`;
        char.style.opacity = progress;
      }
    });
    mainTimeline.add(charTween.setStartTime(index * 150));
  });

  const heartTween = new mojs.Tween({
    duration: 1000,
    easing: mojs.easing.elastic.out,
    onUpdate: (progress) => {
      const scale = progress;
      heartShape.style.transform = `rotate(-45deg) scale(${scale})`;
      heartShape.style.opacity = progress;
    },
    onComplete: () => {
      const heartRect = heartShape.getBoundingClientRect();
      blopBurst
        .tune({
          x: heartRect.left + heartRect.width / 2,
          y: heartRect.top + heartRect.height / 2
        })
        .play();
    }
  });

  mainTimeline.add(heartTween.setStartTime(textChars.length * 150 - 200));
  mainTimeline.play();
});
