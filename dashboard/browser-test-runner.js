/**
 * Browser-compatible test runner for Tailwind Media Queries Lab
 * This file reuses the same test logic as lab.test.js but runs in the browser
 */

class BrowserTestRunner {
  constructor() {
    this.testResults = [];
    this.studentDocument = null;
  }

  /**
   * Load external HTML file for testing
   * @param {string} filePath - Path to the HTML file to test
   * @returns {Promise<Document>} Parsed document
   */
  async loadExternalHTML(filePath) {
    try {
      // Add cache-busting to ensure we get the latest version
      const cacheBuster = `?t=${Date.now()}&r=${Math.random()}`;
      const urlWithCacheBuster = `${filePath}${cacheBuster}`;

      const response = await fetch(urlWithCacheBuster, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.status}`);
      }

      const htmlText = await response.text();
      const parser = new DOMParser();
      this.studentDocument = parser.parseFromString(htmlText, "text/html");

      console.log(`✅ Successfully loaded ${filePath} (bypassed cache)`);
      return this.studentDocument;
    } catch (error) {
      console.error(`❌ Error loading ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Browser-compatible expect function (simplified version of Chai's expect)
   */
  expect(actual) {
    return {
      to: {
        exist: () => {
          if (actual == null) {
            throw new Error(`Expected ${actual} to exist`);
          }
          return true;
        },
        include: (expected, message) => {
          if (!actual || !actual.includes(expected)) {
            throw new Error(message || `Expected "${actual}" to include "${expected}"`);
          }
          return true;
        },
        match: (regex, message) => {
          if (!actual || !regex.test(actual)) {
            throw new Error(message || `Expected "${actual}" to match ${regex}`);
          }
          return true;
        },
        equal: (expected, message) => {
          if (actual !== expected) {
            throw new Error(message || `Expected "${actual}" to equal "${expected}"`);
          }
          return true;
        },
        not: {
          include: (expected, message) => {
            if (actual && actual.includes(expected)) {
              throw new Error(message || `Expected "${actual}" to not include "${expected}"`);
            }
            return true;
          },
        },
        be: {
          greaterThan: (expected, message) => {
            if (actual <= expected) {
              throw new Error(message || `Expected ${actual} to be greater than ${expected}`);
            }
            return true;
          },
          at: {
            least: (expected, message) => {
              if (actual < expected) {
                throw new Error(message || `Expected ${actual} to be at least ${expected}`);
              }
              return true;
            },
          },
        },
      },
    };
  }

  /**
   * Run a single test and capture the result
   * @param {string} testName - Name of the test
   * @param {Function} testFunction - Test function to run
   * @returns {Object} Test result
   */
  runTest(testName, testFunction) {
    try {
      testFunction();
      return {
        name: testName,
        passed: true,
        error: null,
      };
    } catch (error) {
      return {
        name: testName,
        passed: false,
        error: error.message,
      };
    }
  }

  /**
   * Challenge 1: The Responsive Card Tests
   * (Replicates the same logic from lab.test.js)
   */
  testChallenge1() {
    const tests = [];
    let cardContainer, cardImage, cardContent, cardTitle, cardDescription, cardButton;

    const setupElements = () => {
      cardContainer = this.studentDocument.querySelector("#challenge-1 .bg-white");
      cardImage = cardContainer?.querySelector("img");
      cardContent = cardContainer?.querySelector("div>div");
      cardTitle = cardContent?.querySelector("h3");
      cardDescription = cardContent?.querySelector("p");
      cardButton = cardContent?.querySelector("button");
    };

    setupElements();

    tests.push(
      this.runTest("should have a responsive flex layout for tablet and desktop", () => {
        this.expect(cardContainer).to.exist;
        this.expect(cardContainer.className).to.include(
          "md:flex",
          "Card container should have md:flex class for side-by-side layout on tablet"
        );
      })
    );

    tests.push(
      this.runTest("should have responsive image sizing (hint: use md:w-32 md:h-32)", () => {
        this.expect(cardImage).to.exist;
        const imageClasses = cardImage.className;
        this.expect(imageClasses).to.match(/md:w-\d+/, "Image should have responsive width class like md:w-32");
        this.expect(imageClasses).to.match(/md:h-\d+/, "Image should have responsive height class like md:h-32");
      })
    );

    tests.push(
      this.runTest("should have proper content spacing for tablet layout", () => {
        this.expect(cardContent).to.exist;
        const contentClasses = cardContent.className;
        this.expect(contentClasses).to.include("md:mt-0", "Content should have md:mt-0 to remove top margin on tablet");
        this.expect(contentClasses).to.match(/md:ml-\d+/, "Content should have left margin on tablet like md:ml-4");
      })
    );

    tests.push(
      this.runTest("should have responsive typography sizing", () => {
        this.expect(cardTitle).to.exist;
        const titleClasses = cardTitle.className;
        this.expect(titleClasses).to.match(
          /(md:text-|lg:text-)/,
          "Title should have responsive text sizing like md:text-xl"
        );
      })
    );

    tests.push(
      this.runTest("should have hover effects for desktop (hint: use lg:hover:shadow-lg)", () => {
        this.expect(cardContainer).to.exist;
        const containerClasses = cardContainer.className;
        this.expect(containerClasses).to.match(
          /lg:hover:/,
          "Card should have desktop hover effects like lg:hover:shadow-lg"
        );
      })
    );

    tests.push(
      this.runTest("should have responsive button styling", () => {
        this.expect(cardButton).to.exist;
        const buttonClasses = cardButton.className;
        this.expect(buttonClasses).to.include(
          "md:w-auto",
          "Button should change from full width to auto width on tablet with md:w-auto"
        );
      })
    );

    tests.push(
      this.runTest("should maintain mobile-first approach (base styles for mobile)", () => {
        this.expect(cardContainer).to.exist;
        this.expect(cardContainer.className).to.include(
          "rounded-lg",
          "Card should have base mobile styles like rounded-lg"
        );
        this.expect(cardImage.className).to.include("w-full", "Image should be full width on mobile");
        this.expect(cardButton.className).to.include("w-full", "Button should be full width on mobile");
      })
    );

    const passedTests = tests.filter(t => t.passed).length;
    const totalTests = tests.length;

    return {
      challenge: "Challenge 1: The Responsive Card",
      passed: passedTests === totalTests,
      score: `${passedTests}/${totalTests}`,
      message: passedTests === totalTests ? "All tests passed!" : "Some tests failed",
      details: tests,
    };
  }

  /**
   * Challenge 2: The Adaptive Navigation Tests
   * (Replicates the same logic from lab.test.js)
   */
  testChallenge2() {
    const tests = [];
    let nav, navHeader, hamburgerButton, navMenu, navItems, extraContent;

    const setupElements = () => {
      nav = this.studentDocument.querySelector("#challenge-2 nav");
      navHeader = nav?.querySelector("div");
      hamburgerButton = nav?.querySelector("button");
      navMenu = nav?.querySelector("ul");
      navItems = navMenu?.querySelectorAll("li");
      extraContent = nav?.querySelector("div:last-child");
    };

    setupElements();

    tests.push(
      this.runTest("should hide hamburger menu on tablet and desktop", () => {
        this.expect(hamburgerButton).to.exist;
        this.expect(hamburgerButton.className).to.include(
          "md:hidden",
          "Hamburger button should be hidden on tablet+ with md:hidden"
        );
      })
    );

    tests.push(
      this.runTest("should transform menu to horizontal layout on tablet", () => {
        this.expect(navMenu).to.exist;
        const menuClasses = navMenu.className;
        this.expect(menuClasses).to.include("md:flex", "Menu should have md:flex for horizontal layout on tablet");
        this.expect(menuClasses).to.include("md:items-center", "Menu should have md:items-center for proper alignment");
      })
    );

    tests.push(
      this.runTest("should have responsive menu spacing", () => {
        this.expect(navMenu).to.exist;
        const menuClasses = navMenu.className;
        this.expect(menuClasses).to.include("md:mt-0", "Menu should have md:mt-0 to remove top margin on tablet");
        this.expect(menuClasses).to.include(
          "md:space-y-0",
          "Menu should have md:space-y-0 to remove vertical spacing on tablet"
        );
        this.expect(menuClasses).to.match(
          /md:space-x-\d+/,
          "Menu should have horizontal spacing like md:space-x-6 on tablet"
        );
      })
    );

    tests.push(
      this.runTest("should have responsive menu item layout", () => {
        this.expect(navItems.length).to.be.greaterThan(0);
        // Check that menu items work well in both stacked and horizontal layouts
        Array.from(navItems).forEach(item => {
          const link = item.querySelector("a");
          this.expect(link.className).to.include("block", "Menu links should be block elements");
          this.expect(link.className).to.match(/py-\d+/, "Menu links should have vertical padding");
        });
      })
    );

    tests.push(
      this.runTest("should show extra content only on desktop", () => {
        this.expect(extraContent).to.exist;
        const extraClasses = extraContent.className;
        this.expect(extraClasses).to.include("hidden", "Extra content should be hidden on mobile");
        this.expect(extraClasses).to.include("lg:block", "Extra content should be visible on desktop with lg:block");
      })
    );

    tests.push(
      this.runTest("should maintain proper navigation structure", () => {
        this.expect(nav).to.exist;
        this.expect(nav.className).to.include("bg-gray-800", "Navigation should maintain base styling");
        this.expect(navMenu.tagName).to.equal("UL", "Navigation should use semantic HTML with ul element");
        this.expect(navItems.length).to.be.at.least(3, "Navigation should have at least 3 menu items");
      })
    );

    const passedTests = tests.filter(t => t.passed).length;
    const totalTests = tests.length;

    return {
      challenge: "Challenge 2: The Adaptive Navigation",
      passed: passedTests === totalTests,
      score: `${passedTests}/${totalTests}`,
      message: passedTests === totalTests ? "All tests passed!" : "Some tests failed",
      details: tests,
    };
  }

  /**
   * Challenge 3: The Content Choreographer Tests
   * (Replicates the same logic from lab.test.js)
   */
  testChallenge3() {
    const tests = [];
    let dashboard, mainContent, secondaryContent, tertiaryContent, sidebar, statsContainer;

    const setupElements = () => {
      dashboard = this.studentDocument.querySelector("#challenge-3 .bg-white > div");
      mainContent = dashboard?.querySelector("#c3-main-content");
      secondaryContent = dashboard?.querySelector("#c3-secondary-content");
      tertiaryContent = dashboard?.querySelector("#c3-tertiary-content");
      sidebar = dashboard?.querySelector("#c3-sidebar");
      statsContainer = mainContent?.querySelector("#c3-stats");
    };

    setupElements();

    tests.push(
      this.runTest("should have responsive grid layout", () => {
        this.expect(dashboard).to.exist;
        const dashboardClasses = dashboard.className;
        this.expect(dashboardClasses).to.include("grid", "Dashboard should use CSS Grid");
        this.expect(dashboardClasses).to.include("grid-cols-1", "Dashboard should have 1 column on mobile");
        this.expect(dashboardClasses).to.include("md:grid-cols-2", "Dashboard should have 2 columns on tablet");
        this.expect(dashboardClasses).to.include("lg:grid-cols-3", "Dashboard should have 3 columns on desktop");
      })
    );

    tests.push(
      this.runTest("should have proper grid gap spacing", () => {
        this.expect(dashboard).to.exist;
        const dashboardClasses = dashboard.className;
        this.expect(dashboardClasses).to.match(/gap-\d+/, "Dashboard should have gap spacing between grid items");
      })
    );

    tests.push(
      this.runTest("should hide secondary content on mobile, show on tablet+", () => {
        this.expect(secondaryContent).to.exist;
        const secondaryClasses = secondaryContent.className;
        this.expect(secondaryClasses).to.include("hidden", "Secondary content should be hidden on mobile");
        this.expect(secondaryClasses).to.include(
          "md:block",
          "Secondary content should be visible on tablet+ with md:block"
        );
      })
    );

    tests.push(
      this.runTest("should hide tertiary content on mobile and tablet, show on desktop", () => {
        this.expect(tertiaryContent).to.exist;
        const tertiaryClasses = tertiaryContent.className;
        this.expect(tertiaryClasses).to.include("hidden", "Tertiary content should be hidden on mobile");
        this.expect(tertiaryClasses).to.include(
          "lg:block",
          "Tertiary content should be visible on desktop with lg:block"
        );
      })
    );

    tests.push(
      this.runTest("should hide sidebar on mobile/tablet, show on desktop", () => {
        this.expect(sidebar).to.exist;
        const sidebarClasses = sidebar.className;
        this.expect(sidebarClasses).to.include("hidden", "Sidebar should be hidden on mobile");
        this.expect(sidebarClasses).to.include("lg:block", "Sidebar should be visible on desktop with lg:block");
      })
    );

    tests.push(
      this.runTest("should have responsive stats layout", () => {
        this.expect(statsContainer).to.exist;
        const statsClasses = statsContainer.className;
        this.expect(statsClasses).to.include("md:flex", "Stats should have horizontal layout on tablet with md:flex");
        this.expect(statsClasses).to.match(/md:space-x-\d+/, "Stats should have horizontal spacing on tablet");
      })
    );

    tests.push(
      this.runTest("should maintain main content visibility across all breakpoints", () => {
        this.expect(mainContent).to.exist;
        const mainClasses = mainContent.className;
        // Main content should NOT have hidden classes
        this.expect(mainClasses).to.not.include("hidden", "Main content should always be visible");
        this.expect(mainContent.textContent).to.include(
          "Main Dashboard",
          "Main content should contain essential dashboard information"
        );
      })
    );

    tests.push(
      this.runTest("should demonstrate progressive enhancement", () => {
        // Check that content progressively enhances from mobile to desktop
        const allContent = dashboard.querySelectorAll('div[class*="bg-"]');
        this.expect(allContent.length).to.be.at.least(4, "Dashboard should have multiple content sections");

        // Count hidden elements (should have some for progressive disclosure)
        const hiddenElements = dashboard.querySelectorAll(".hidden");
        this.expect(hiddenElements.length).to.be.at.least(
          2,
          "Dashboard should hide some content on mobile for progressive enhancement"
        );
      })
    );

    const passedTests = tests.filter(t => t.passed).length;
    const totalTests = tests.length;

    return {
      challenge: "Challenge 3: The Content Choreographer",
      passed: passedTests === totalTests,
      score: `${passedTests}/${totalTests}`,
      message: passedTests === totalTests ? "All tests passed!" : "Some tests failed",
      details: tests,
    };
  }

  /**
   * Challenge Integration Tests
   * (Replicates the same logic from lab.test.js)
   */
  testIntegration() {
    const tests = [];

    tests.push(
      this.runTest("should have consistent responsive patterns across challenges", () => {
        // Check that similar responsive patterns are used consistently
        const flexElements = this.studentDocument.querySelectorAll('[class*="md:flex"]');
        const hiddenElements = this.studentDocument.querySelectorAll('[class*="hidden"]');
        const gridElements = this.studentDocument.querySelectorAll('[class*="grid"]');

        this.expect(flexElements.length).to.be.at.least(2, "Should use flex layout consistently");
        this.expect(hiddenElements.length).to.be.at.least(3, "Should use progressive disclosure consistently");
        this.expect(gridElements.length).to.be.at.least(1, "Should use grid layout where appropriate");
      })
    );

    const passedTests = tests.filter(t => t.passed).length;
    const totalTests = tests.length;

    return {
      challenge: "Challenge Integration Tests",
      passed: passedTests === totalTests,
      score: `${passedTests}/${totalTests}`,
      message: passedTests === totalTests ? "All integration tests passed!" : "Some integration tests failed",
      details: tests,
    };
  }

  /**
   * Run all tests on the external file
   * @param {string} filePath - Path to the HTML file to test
   */
  async runAllTests(filePath = "./lab/starter-template.html") {
    try {
      console.log(`🧪 Loading ${filePath} for testing (bypassing cache)...`);

      // Load the external HTML file (with cache-busting)
      await this.loadExternalHTML(filePath);

      // Run all test suites
      const results = [];
      results.push(this.testChallenge1());
      results.push(this.testChallenge2());
      results.push(this.testChallenge3());
      results.push(this.testIntegration());

      // Display results
      this.displayTestResults(results);

      return results;
    } catch (error) {
      console.error("❌ Failed to run tests:", error);
      this.displayTestError(error);
      throw error;
    }
  }

  /**
   * Display test results in a nice format
   * @param {Array} results - Array of test results
   */
  displayTestResults(results) {
    // Remove any existing results
    const existingResults = document.querySelector("#browser-test-results");
    if (existingResults) {
      existingResults.remove();
    }

    // Create results container
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "browser-test-results";
    resultsDiv.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const modal = document.createElement("div");
    modal.className = "bg-white rounded-lg shadow-xl max-w-6xl max-h-[90vh] overflow-y-auto m-4";

    let totalPassed = 0;
    let totalTests = 0;

    results.forEach(result => {
      const [passed, total] = result.score.split("/").map(Number);
      totalPassed += passed;
      totalTests += total;
    });

    const overallSuccess = totalPassed === totalTests;

    modal.innerHTML = `
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-900">Test Results - starter-template.html</h2>
          <button onclick="document.getElementById('browser-test-results').remove()"
                  class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="mb-6 p-4 rounded-lg ${overallSuccess ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"} border">
          <div class="flex items-center space-x-2">
            <div class="text-2xl">${overallSuccess ? "🎉" : "⚠️"}</div>
            <div class="flex-1">
              <div class="text-lg font-semibold ${overallSuccess ? "text-green-800" : "text-yellow-800"}">
                Overall Score: ${totalPassed}/${totalTests} tests passed
              </div>
              <div class="text-sm ${overallSuccess ? "text-green-600" : "text-yellow-600"} mt-1">
                ${overallSuccess ? "🎊 All challenges completed successfully! You're a responsive design master!" : "Keep going! You're making great progress on your responsive design journey."}
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-500">📁 Cache bypassed</div>
              <div class="text-xs text-gray-400">${new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          ${results
            .map(
              result => `
            <div class="border border-gray-200 rounded-lg p-4 ${result.passed ? "bg-green-50" : "bg-red-50"}">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-900">${result.challenge}</h3>
                <span class="text-sm font-medium px-3 py-1 rounded-full ${
                  result.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }">
                  ${result.score}
                </span>
              </div>

              <div class="text-sm text-gray-600 mb-3">${result.message}</div>

              <div class="space-y-2 max-h-48 overflow-y-auto">
                ${result.details
                  .map(
                    detail => `
                  <div class="flex items-start space-x-2 text-sm p-2 rounded ${
                    detail.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  } border">
                    <span class="text-lg ${detail.passed ? "text-green-500" : "text-red-500"}">
                      ${detail.passed ? "✅" : "❌"}
                    </span>
                    <div class="flex-1">
                      <div class="font-medium ${detail.passed ? "text-green-800" : "text-red-800"}">
                        ${detail.name}
                      </div>
                      ${detail.error ? `<div class="text-xs text-red-600 mt-1">${detail.error}</div>` : ""}
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="mt-6 text-center space-x-4">
          <button onclick="document.getElementById('browser-test-results').remove()"
                  class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Close Results
          </button>
          <button onclick="runTests()"
                  class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            🔄 Run Tests Again
          </button>
          <button onclick="window.location.reload()"
                  class="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700">
            Refresh Page
          </button>
        </div>
      </div>
    `;

    resultsDiv.appendChild(modal);
    document.body.appendChild(resultsDiv);
  }

  /**
   * Display test error
   * @param {Error} error - The error that occurred
   */
  displayTestError(error) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-50 max-w-md";
    errorDiv.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="font-bold">Testing Error</div>
          <div class="text-sm">Could not load starter-template.html</div>
          <div class="text-sm font-bold text-yellow mt-1">TIP: make sure that you have run "npm run serve" and then accessed this page at "localhost:8080/dashboard/index.html". If you open it without serving it (for example, just by double clicking on the file), the browser will not allow you to run the tests because of CORS (you'll learn about CORS eventually)!</div>
          <div class="text-xs text-red-600 mt-1">${error.message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-500 hover:text-red-700 text-xl">&times;</button>
      </div>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 12000);
  }
}

// Global function to run tests (maintains compatibility with existing buttons)
async function runTests() {
  const runner = new BrowserTestRunner();
  await runner.runAllTests("../lab/starter-template.html");
}

// Global function for backward compatibility
async function testStudentFile() {
  await runTests();
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = BrowserTestRunner;
}
