
// 'yPercent: 100' starts the red div completely below the section
// It then eases up to its '0' position (covering the top section)
gsap.from(".ResumeTOP", {
  yPercent: 100,      // Start 100% below its natural position
  duration: 1.0,      // Animation length
  ease: "power2.out", // Smooth deceleration
  delay: 0.2          // Slight wait for the page to settle
});