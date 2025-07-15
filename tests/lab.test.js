/**
 * Tailwind Media Queries Lab Tests
 * Uses Mocha and Chai for testing responsive design implementations
 */

const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

describe("Tailwind Media Queries Lab", function () {
  let dom;
  let document;
  let window;

  beforeEach(function () {
    // Load the starter template HTML
    const htmlPath = path.join(__dirname, "../lab/starter-template.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    dom = new JSDOM(html, {
      pretendToBeVisual: true,
      resources: "usable",
    });

    document = dom.window.document;
    window = dom.window;
  });

  describe("Challenge 1: The Responsive Card", function () {
    let cardContainer;
    let cardImage;
    let cardContent;
    let cardTitle;
    let cardDescription;
    let cardButton;

    beforeEach(function () {
      cardContainer = document.querySelector("#challenge-1 .bg-white");
      cardImage = cardContainer?.querySelector("img");
      cardContent = cardContainer?.querySelector("div>div");
      cardTitle = cardContent?.querySelector("h3");
      cardDescription = cardContent?.querySelector("p");
      cardButton = cardContent?.querySelector("button");
    });

    it("should have a responsive flex layout for tablet and desktop", function () {
      expect(cardContainer).to.exist;
      expect(cardContainer.className).to.include(
        "md:flex",
        "Card container should have md:flex class for side-by-side layout on tablet"
      );
    });

    it("should have responsive image sizing (hint: use md:w-32 md:h-32)", function () {
      expect(cardImage).to.exist;
      const imageClasses = cardImage.className;
      expect(imageClasses).to.match(/md:w-\d+/, "Image should have responsive width class like md:w-32");
      expect(imageClasses).to.match(/md:h-\d+/, "Image should have responsive height class like md:h-32");
    });

    it("should have proper content spacing for tablet layout", function () {
      expect(cardContent).to.exist;
      const contentClasses = cardContent.className;
      expect(contentClasses).to.include("md:mt-0", "Content should have md:mt-0 to remove top margin on tablet");
      expect(contentClasses).to.match(/md:ml-\d+/, "Content should have left margin on tablet like md:ml-4");
    });

    it("should have responsive typography sizing", function () {
      expect(cardTitle).to.exist;
      const titleClasses = cardTitle.className;
      expect(titleClasses).to.match(/(md:text-|lg:text-)/, "Title should have responsive text sizing like md:text-xl");
    });

    it("should have hover effects for desktop (hint: use lg:hover:shadow-lg)", function () {
      expect(cardContainer).to.exist;
      const containerClasses = cardContainer.className;
      expect(containerClasses).to.match(/lg:hover:/, "Card should have desktop hover effects like lg:hover:shadow-lg");
    });

    it("should have responsive button styling", function () {
      expect(cardButton).to.exist;
      const buttonClasses = cardButton.className;
      expect(buttonClasses).to.include(
        "md:w-auto",
        "Button should change from full width to auto width on tablet with md:w-auto"
      );
    });

    it("should maintain mobile-first approach (base styles for mobile)", function () {
      expect(cardContainer).to.exist;
      expect(cardContainer.className).to.include("rounded-lg", "Card should have base mobile styles like rounded-lg");
      expect(cardImage.className).to.include("w-full", "Image should be full width on mobile");
      expect(cardButton.className).to.include("w-full", "Button should be full width on mobile");
    });
  });

  describe("Challenge 2: The Adaptive Navigation", function () {
    let nav;
    let navHeader;
    let hamburgerButton;
    let navMenu;
    let navItems;
    let extraContent;

    beforeEach(function () {
      nav = document.querySelector("#challenge-2 nav");
      navHeader = nav?.querySelector("div");
      hamburgerButton = nav?.querySelector("button");
      navMenu = nav?.querySelector("ul");
      navItems = navMenu?.querySelectorAll("li");
      extraContent = nav?.querySelector("div:last-child");
    });

    it("should hide hamburger menu on tablet and desktop", function () {
      expect(hamburgerButton).to.exist;
      expect(hamburgerButton.className).to.include(
        "md:hidden",
        "Hamburger button should be hidden on tablet+ with md:hidden"
      );
    });

    it("should transform menu to horizontal layout on tablet", function () {
      expect(navMenu).to.exist;
      const menuClasses = navMenu.className;
      expect(menuClasses).to.include("md:flex", "Menu should have md:flex for horizontal layout on tablet");
      expect(menuClasses).to.include("md:items-center", "Menu should have md:items-center for proper alignment");
    });

    it("should have responsive menu spacing", function () {
      expect(navMenu).to.exist;
      const menuClasses = navMenu.className;
      expect(menuClasses).to.include("md:mt-0", "Menu should have md:mt-0 to remove top margin on tablet");
      expect(menuClasses).to.include(
        "md:space-y-0",
        "Menu should have md:space-y-0 to remove vertical spacing on tablet"
      );
      expect(menuClasses).to.match(/md:space-x-\d+/, "Menu should have horizontal spacing like md:space-x-6 on tablet");
    });

    it("should have responsive menu item layout", function () {
      expect(navItems.length).to.be.greaterThan(0);
      // Check that menu items work well in both stacked and horizontal layouts
      navItems.forEach(item => {
        const link = item.querySelector("a");
        expect(link.className).to.include("block", "Menu links should be block elements");
        expect(link.className).to.match(/py-\d+/, "Menu links should have vertical padding");
      });
    });

    it("should show extra content only on desktop", function () {
      expect(extraContent).to.exist;
      const extraClasses = extraContent.className;
      expect(extraClasses).to.include("hidden", "Extra content should be hidden on mobile");
      expect(extraClasses).to.include("lg:block", "Extra content should be visible on desktop with lg:block");
    });

    it("should maintain proper navigation structure", function () {
      expect(nav).to.exist;
      expect(nav.className).to.include("bg-gray-800", "Navigation should maintain base styling");
      expect(navMenu.tagName).to.equal("UL", "Navigation should use semantic HTML with ul element");
      expect(navItems.length).to.be.at.least(3, "Navigation should have at least 3 menu items");
    });
  });

  describe("Challenge 3: The Content Choreographer", function () {
    let dashboard;
    let mainContent;
    let secondaryContent;
    let tertiaryContent;
    let sidebar;
    let statsContainer;

    beforeEach(function () {
      dashboard = document.querySelector("#challenge-3 .bg-white > div");
      mainContent = dashboard?.querySelector("#c3-main-content");
      secondaryContent = dashboard?.querySelector("#c3-secondary-content");
      tertiaryContent = dashboard?.querySelector("#c3-tertiary-content");
      sidebar = dashboard?.querySelector("#c3-sidebar");
      statsContainer = mainContent?.querySelector("#c3-stats");
    });

    it("should have responsive grid layout", function () {
      expect(dashboard).to.exist;
      const dashboardClasses = dashboard.className;
      expect(dashboardClasses).to.include("grid", "Dashboard should use CSS Grid");
      expect(dashboardClasses).to.include("grid-cols-1", "Dashboard should have 1 column on mobile");
      expect(dashboardClasses).to.include("md:grid-cols-2", "Dashboard should have 2 columns on tablet");
      expect(dashboardClasses).to.include("lg:grid-cols-3", "Dashboard should have 3 columns on desktop");
    });

    it("should have proper grid gap spacing", function () {
      expect(dashboard).to.exist;
      const dashboardClasses = dashboard.className;
      expect(dashboardClasses).to.match(/gap-\d+/, "Dashboard should have gap spacing between grid items");
    });

    it("should hide secondary content on mobile, show on tablet+", function () {
      expect(secondaryContent).to.exist;
      const secondaryClasses = secondaryContent.className;
      expect(secondaryClasses).to.include("hidden", "Secondary content should be hidden on mobile");
      expect(secondaryClasses).to.include("md:block", "Secondary content should be visible on tablet+ with md:block");
    });

    it("should hide tertiary content on mobile and tablet, show on desktop", function () {
      expect(tertiaryContent).to.exist;
      const tertiaryClasses = tertiaryContent.className;
      expect(tertiaryClasses).to.include("hidden", "Tertiary content should be hidden on mobile");
      expect(tertiaryClasses).to.include("lg:block", "Tertiary content should be visible on desktop with lg:block");
    });

    it("should hide sidebar on mobile/tablet, show on desktop", function () {
      expect(sidebar).to.exist;
      const sidebarClasses = sidebar.className;
      expect(sidebarClasses).to.include("hidden", "Sidebar should be hidden on mobile");
      expect(sidebarClasses).to.include("lg:block", "Sidebar should be visible on desktop with lg:block");
    });

    it("should have responsive stats layout", function () {
      expect(statsContainer).to.exist;
      const statsClasses = statsContainer.className;
      expect(statsClasses).to.include("md:flex", "Stats should have horizontal layout on tablet with md:flex");
      expect(statsClasses).to.match(/md:space-x-\d+/, "Stats should have horizontal spacing on tablet");
    });

    it("should maintain main content visibility across all breakpoints", function () {
      expect(mainContent).to.exist;
      const mainClasses = mainContent.className;
      // Main content should NOT have hidden classes
      expect(mainClasses).to.not.include("hidden", "Main content should always be visible");
      expect(mainContent.textContent).to.include(
        "Main Dashboard",
        "Main content should contain essential dashboard information"
      );
    });

    it("should demonstrate progressive enhancement", function () {
      // Check that content progressively enhances from mobile to desktop
      const allContent = dashboard.querySelectorAll('div[class*="bg-"]');
      expect(allContent.length).to.be.at.least(4, "Dashboard should have multiple content sections");

      // Count hidden elements (should have some for progressive disclosure)
      const hiddenElements = dashboard.querySelectorAll(".hidden");
      expect(hiddenElements.length).to.be.at.least(
        2,
        "Dashboard should hide some content on mobile for progressive enhancement"
      );
    });
  });

  describe("Challenge Integration Tests", function () {
    it("should have consistent responsive patterns across challenges", function () {
      // Check that similar responsive patterns are used consistently
      const flexElements = document.querySelectorAll('[class*="md:flex"]');
      const hiddenElements = document.querySelectorAll('[class*="hidden"]');
      const gridElements = document.querySelectorAll('[class*="grid"]');

      expect(flexElements.length).to.be.at.least(2, "Should use flex layout consistently");
      expect(hiddenElements.length).to.be.at.least(3, "Should use progressive disclosure consistently");
      expect(gridElements.length).to.be.at.least(1, "Should use grid layout where appropriate");
    });
  });
});

// Helper function to simulate different viewport sizes
function simulateViewport(width) {
  // This would be used in a real browser environment
  // For testing, we can check if the right classes are present
  return {
    mobile: width < 768,
    tablet: width >= 768 && width < 1024,
    desktop: width >= 1024,
  };
}

// Additional test utilities for manual testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    simulateViewport,
    // Export test utilities for use in other files
    testResponsiveClasses: function (element, expectedClasses) {
      const classes = element.className;
      return expectedClasses.every(cls => classes.includes(cls));
    },
  };
}
