/**
 * Lab Controller for Tailwind Media Queries Lab
 * Manages lab state, progress tracking, and interactive features
 */

class TailwindLabController {
  constructor() {
    this.currentBreakpoint = "mobile";
    this.challenges = {
      1: { completed: false, name: "Responsive Card" },
      2: { completed: false, name: "Adaptive Navigation" },
      3: { completed: false, name: "Content Choreographer" },
    };
    this.testResults = [];
    this.studentDocument = null;
    this.init();
  }

  init() {
    this.setupBreakpointDetection();
    this.setupProgressTracking();
    this.setupInteractiveFeatures();
    this.celebrateResize();
  }

  /**
   * Detect current breakpoint based on window width
   * @returns {string} Current breakpoint (mobile, tablet, desktop)
   */
  detectBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  /**
   * Setup breakpoint detection and responsive behavior
   */
  setupBreakpointDetection() {
    const updateBreakpoint = () => {
      const newBreakpoint = this.detectBreakpoint();
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        this.onBreakpointChange(newBreakpoint);
      }
    };

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateBreakpoint, 100);
    });

    // Initial check
    updateBreakpoint();
  }

  /**
   * Handle breakpoint changes with celebrations and updates
   * @param {string} newBreakpoint - The new breakpoint
   */
  onBreakpointChange(newBreakpoint) {
    console.log(`🎉 Breakpoint changed to: ${newBreakpoint}`);

    // Add celebration animation
    this.celebrateBreakpointChange(newBreakpoint);

    // Update any breakpoint-specific UI
    this.updateBreakpointUI(newBreakpoint);

    // Show contextual tips
    this.showBreakpointTips(newBreakpoint);
  }

  /**
   * Celebrate breakpoint changes with animations
   * @param {string} breakpoint - Current breakpoint
   */
  celebrateBreakpointChange(breakpoint) {
    // Create celebration notification
    const celebration = document.createElement("div");
    celebration.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-500`;

    // Style based on breakpoint
    switch (breakpoint) {
      case "mobile":
        celebration.className += " bg-green-500 text-black font-mono";
        celebration.innerHTML = "📱 MOBILE MODE ACTIVATED";
        break;
      case "tablet":
        celebration.className += " bg-purple-500 text-white font-bold";
        celebration.innerHTML = "🎯 TABLET MODE ACTIVATED";
        break;
      case "desktop":
        celebration.className += " bg-blue-500 text-white font-semibold";
        celebration.innerHTML = "🖥️ DESKTOP MODE ACTIVATED";
        break;
    }

    document.body.appendChild(celebration);

    // Animate in
    setTimeout(() => {
      celebration.style.opacity = "1";
      celebration.style.transform = "translate(-50%, 0) scale(1.05)";
    }, 100);

    // Animate out
    setTimeout(() => {
      celebration.style.opacity = "0";
      celebration.style.transform = "translate(-50%, -20px) scale(0.95)";
      setTimeout(() => {
        if (celebration.parentNode) {
          celebration.parentNode.removeChild(celebration);
        }
      }, 300);
    }, 2000);
  }

  /**
   * Update UI elements based on current breakpoint
   * @param {string} breakpoint - Current breakpoint
   */
  updateBreakpointUI(breakpoint) {
    // Update breakpoint indicator if it exists
    const indicator = document.getElementById("breakpoint-indicator");
    if (indicator) {
      const width = window.innerWidth;
      indicator.textContent = `${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}: ${width}px`;
      indicator.className = `breakpoint-indicator ${breakpoint}`;
    }

    // Update any responsive hints
    this.updateResponsiveHints(breakpoint);
  }

  /**
   * Show contextual tips based on breakpoint
   * @param {string} breakpoint - Current breakpoint
   */
  showBreakpointTips(breakpoint) {
    const tips = {
      mobile: [
        "📱 Mobile-first design starts here!",
        "💡 Focus on essential content only",
        "👆 Make sure touch targets are large enough",
      ],
      tablet: [
        "🎯 Perfect for testing responsive layouts!",
        "✨ Great opportunity to show more content",
        "🔄 Try switching between portrait and landscape",
      ],
      desktop: [
        "🖥️ Full desktop experience available",
        "🎨 Hover effects and animations work here",
        "📊 Complex layouts and multiple columns shine",
      ],
    };

    const tipText = tips[breakpoint][Math.floor(Math.random() * tips[breakpoint].length)];
    console.log(`💡 Tip: ${tipText}`);
  }

  /**
   * Update responsive hints in the UI
   * @param {string} breakpoint - Current breakpoint
   */
  updateResponsiveHints(breakpoint) {
    const hints = document.querySelectorAll(".responsive-hint");
    hints.forEach(hint => {
      const breakpointClass = hint.dataset.breakpoint;
      if (breakpointClass === breakpoint) {
        hint.style.display = "block";
      } else {
        hint.style.display = "none";
      }
    });
  }

  /**
   * Setup progress tracking for challenges
   */
  setupProgressTracking() {
    // Check for completed challenges on page load
    this.checkChallengeCompletion();

    // Set up observers for challenge completion
    this.observeChallengeChanges();
  }

  /**
   * Check if challenges are completed based on DOM analysis
   */
  checkChallengeCompletion() {
    // Challenge 1: Check for responsive card classes
    const challenge1 = document.querySelector("#challenge-1 .bg-white");
    if (challenge1 && this.hasResponsiveClasses(challenge1)) {
      this.markChallengeComplete(1);
    }

    // Challenge 2: Check for responsive navigation
    const challenge2 = document.querySelector("#challenge-2 nav");
    if (challenge2 && this.hasResponsiveNavigation(challenge2)) {
      this.markChallengeComplete(2);
    }

    // Challenge 3: Check for responsive dashboard
    const challenge3 = document.querySelector("#challenge-3 .bg-white");
    if (challenge3 && this.hasResponsiveDashboard(challenge3)) {
      this.markChallengeComplete(3);
    }
  }

  /**
   * Check if element has responsive classes
   * @param {Element} element - DOM element to check
   * @returns {boolean} - Whether element has responsive classes
   */
  hasResponsiveClasses(element) {
    const classList = element.className;
    return classList.includes("md:") || classList.includes("lg:") || classList.includes("xl:");
  }

  /**
   * Check if navigation has responsive behavior
   * @param {Element} nav - Navigation element
   * @returns {boolean} - Whether navigation is responsive
   */
  hasResponsiveNavigation(nav) {
    const classList = nav.className;
    return classList.includes("md:") && (classList.includes("hidden") || classList.includes("flex"));
  }

  /**
   * Check if dashboard has responsive layout
   * @param {Element} dashboard - Dashboard element
   * @returns {boolean} - Whether dashboard is responsive
   */
  hasResponsiveDashboard(dashboard) {
    const classList = dashboard.className;
    return classList.includes("grid") && (classList.includes("md:grid-cols") || classList.includes("lg:grid-cols"));
  }

  /**
   * Mark a challenge as complete
   * @param {number} challengeNumber - Challenge number (1-3)
   */
  markChallengeComplete(challengeNumber) {
    if (!this.challenges[challengeNumber].completed) {
      this.challenges[challengeNumber].completed = true;
      this.celebrateChallenge(challengeNumber);
      this.updateProgressUI();
    }
  }

  /**
   * Celebrate challenge completion
   * @param {number} challengeNumber - Completed challenge number
   */
  celebrateChallenge(challengeNumber) {
    const challengeName = this.challenges[challengeNumber].name;
    console.log(`🎉 Challenge ${challengeNumber} completed: ${challengeName}`);

    // Create celebration modal or notification
    this.showChallengeCompletionModal(challengeNumber, challengeName);
  }

  /**
   * Show challenge completion modal
   * @param {number} challengeNumber - Challenge number
   * @param {string} challengeName - Challenge name
   */
  showChallengeCompletionModal(challengeNumber, challengeName) {
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
                <div class="text-6xl mb-4">🎉</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    Challenge ${challengeNumber} Complete!
                </h2>
                <p class="text-gray-600 mb-6">
                    Great job completing "${challengeName}"!
                    Your responsive design skills are improving.
                </p>
                <button onclick="this.parentElement.parentElement.remove()"
                        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Continue Learning
                </button>
            </div>
        `;

    document.body.appendChild(modal);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 5000);
  }

  /**
   * Update progress UI elements
   */
  updateProgressUI() {
    const completedCount = Object.values(this.challenges).filter(c => c.completed).length;
    const totalCount = Object.keys(this.challenges).length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    // Update progress bars
    const progressBars = document.querySelectorAll(".progress-fill");
    progressBars.forEach(bar => {
      bar.style.width = `${percentage}%`;
    });

    // Update progress text
    const progressTexts = document.querySelectorAll(".progress-text");
    progressTexts.forEach(text => {
      text.textContent = `${completedCount}/${totalCount} challenges completed`;
    });
  }

  /**
   * Observe changes in challenge containers
   */
  observeChallengeChanges() {
    const challengeContainers = document.querySelectorAll(".challenge-container");

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        // Debounce the check
        clearTimeout(this.checkTimeout);
        this.checkTimeout = setTimeout(() => {
          this.checkChallengeCompletion();
        }, 500);
      });

      challengeContainers.forEach(container => {
        observer.observe(container, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      });
    }
  }

  /**
   * Setup interactive features
   */
  setupInteractiveFeatures() {
    // Add resize celebration
    this.setupResizeCelebration();
  }

  /**
   * Setup resize celebration
   */
  setupResizeCelebration() {
    let resizeCount = 0;
    let resizeTimeout;

    window.addEventListener("resize", () => {
      resizeCount++;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (resizeCount >= 3) {
          this.celebrateResize();
          resizeCount = 0;
        }
      }, 1000);
    });
  }

  /**
   * Celebrate when user resizes window multiple times
   */
  celebrateResize() {
    const messages = [
      "🎉 Great job testing responsive design!",
      "👏 You're getting the hang of breakpoints!",
      "🚀 Resize master in action!",
      "💪 Keep exploring those breakpoints!",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage);
  }
}

// Global functions for button interactions
function startChallenge() {
  const challenge1 = document.querySelector("#challenge-1");
  if (challenge1) {
    challenge1.scrollIntoView({ behavior: "smooth" });
  } else {
    // If on main lab page, navigate to starter template
    window.open("starter-template.html", "_blank").focus();
  }
}

function viewLessons() {
  const lessons = ["../lessons/intro.md", "../lessons/mobile-first.md", "../lessons/breakpoint-reference.md"];

  // Open first lesson in new tab
  window.open(lessons[0], "_blank");
}

function runTests() {
  if (window.labController) {
    window.labController.runTests();
  } else {
    alert("🧪 Tests would check your responsive classes and provide feedback!");
  }
}

// Initialize lab controller when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.labController = new TailwindLabController();
  console.log("🚀 Tailwind Media Queries Lab loaded successfully!");
  console.log("💡 Try resizing the window to see the interface transform");
});
