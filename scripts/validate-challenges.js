#!/usr/bin/env node

/**
 * Validation Script for Tailwind Media Queries Lab
 * Checks if students have completed challenges correctly
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class ChallengeValidator {
    constructor() {
        this.results = {
            challenge1: { passed: false, errors: [], warnings: [] },
            challenge2: { passed: false, errors: [], warnings: [] },
            challenge3: { passed: false, errors: [], warnings: [] },
            overall: { passed: false, score: 0 }
        };
    }

    /**
     * Main validation entry point
     */
    async validate() {
        console.log('🔍 Validating Tailwind Media Queries Lab Challenges...\n');

        try {
            // Load the student's HTML file
            const htmlPath = path.join(__dirname, '../lab/starter-template.html');
            const htmlContent = fs.readFileSync(htmlPath, 'utf8');

            // Parse HTML with JSDOM
            const dom = new JSDOM(htmlContent);
            const document = dom.window.document;

            // Validate each challenge
            this.validateChallenge1(document);
            this.validateChallenge2(document);
            this.validateChallenge3(document);

            // Calculate overall results
            this.calculateOverallResults();

            // Display results
            this.displayResults();

            // Return success/failure
            return this.results.overall.passed;

        } catch (error) {
            console.error('❌ Error during validation:', error.message);
            return false;
        }
    }

    /**
     * Validate Challenge 1: The Responsive Card
     */
    validateChallenge1(document) {
        const challenge = this.results.challenge1;
        const cardContainer = document.querySelector('#challenge-1 .bg-white');

        if (!cardContainer) {
            challenge.errors.push('Card container not found');
            return;
        }

        const cardClasses = cardContainer.className;
        const cardImage = cardContainer.querySelector('img');
        const cardContent = cardContainer.querySelector('div');
        const cardTitle = cardContent?.querySelector('h3');
        const cardButton = cardContent?.querySelector('button');

        // Check for responsive flex layout
        if (cardClasses.includes('md:flex')) {
            console.log('✅ Challenge 1: Responsive flex layout found');
        } else {
            challenge.errors.push('Missing md:flex class for responsive layout');
        }

        // Check for responsive image sizing
        if (cardImage) {
            const imageClasses = cardImage.className;
            if (imageClasses.includes('md:w-') && imageClasses.includes('md:h-')) {
                console.log('✅ Challenge 1: Responsive image sizing found');
            } else {
                challenge.errors.push('Missing responsive image sizing (md:w-* and md:h-*)');
            }
        }

        // Check for content spacing
        if (cardContent) {
            const contentClasses = cardContent.className;
            if (contentClasses.includes('md:mt-0') && contentClasses.includes('md:ml-')) {
                console.log('✅ Challenge 1: Responsive content spacing found');
            } else {
                challenge.warnings.push('Consider adding md:mt-0 and md:ml-* for better tablet layout');
            }
        }

        // Check for hover effects
        if (cardClasses.includes('lg:hover:')) {
            console.log('✅ Challenge 1: Desktop hover effects found');
        } else {
            challenge.warnings.push('Consider adding lg:hover: effects for desktop experience');
        }

        // Check for responsive button
        if (cardButton) {
            const buttonClasses = cardButton.className;
            if (buttonClasses.includes('md:w-auto')) {
                console.log('✅ Challenge 1: Responsive button sizing found');
            } else {
                challenge.warnings.push('Consider adding md:w-auto to button for better tablet layout');
            }
        }

        // Check for responsive typography
        if (cardTitle) {
            const titleClasses = cardTitle.className;
            if (titleClasses.includes('md:text-') || titleClasses.includes('lg:text-')) {
                console.log('✅ Challenge 1: Responsive typography found');
            } else {
                challenge.warnings.push('Consider adding responsive typography (md:text-* or lg:text-*)');
            }
        }

        challenge.passed = challenge.errors.length === 0;
    }

    /**
     * Validate Challenge 2: The Adaptive Navigation
     */
    validateChallenge2(document) {
        const challenge = this.results.challenge2;
        const nav = document.querySelector('#challenge-2 nav');

        if (!nav) {
            challenge.errors.push('Navigation element not found');
            return;
        }

        const hamburger = nav.querySelector('button');
        const menu = nav.querySelector('ul');
        const extraContent = nav.querySelector('div:last-child');

        // Check hamburger button hiding
        if (hamburger) {
            const hamburgerClasses = hamburger.className;
            if (hamburgerClasses.includes('md:hidden')) {
                console.log('✅ Challenge 2: Hamburger hidden on tablet+');
            } else {
                challenge.errors.push('Missing md:hidden class on hamburger button');
            }
        }

        // Check menu responsive layout
        if (menu) {
            const menuClasses = menu.className;
            if (menuClasses.includes('md:flex')) {
                console.log('✅ Challenge 2: Menu horizontal layout found');
            } else {
                challenge.errors.push('Missing md:flex class on menu for horizontal layout');
            }

            if (menuClasses.includes('md:items-center')) {
                console.log('✅ Challenge 2: Menu alignment found');
            } else {
                challenge.warnings.push('Consider adding md:items-center for better menu alignment');
            }

            if (menuClasses.includes('md:space-x-')) {
                console.log('✅ Challenge 2: Horizontal menu spacing found');
            } else {
                challenge.warnings.push('Consider adding md:space-x-* for horizontal menu spacing');
            }

            if (menuClasses.includes('md:mt-0')) {
                console.log('✅ Challenge 2: Menu top margin reset found');
            } else {
                challenge.warnings.push('Consider adding md:mt-0 to reset menu top margin');
            }
        }

        // Check extra content visibility
        if (extraContent) {
            const extraClasses = extraContent.className;
            if (extraClasses.includes('hidden') && extraClasses.includes('lg:block')) {
                console.log('✅ Challenge 2: Extra content progressive disclosure found');
            } else {
                challenge.warnings.push('Consider hiding extra content on mobile and showing on desktop');
            }
        }

        challenge.passed = challenge.errors.length === 0;
    }

    /**
     * Validate Challenge 3: The Content Choreographer
     */
    validateChallenge3(document) {
        const challenge = this.results.challenge3;
        const dashboard = document.querySelector('#challenge-3 .bg-white > div');

        if (!dashboard) {
            challenge.errors.push('Dashboard container not found');
            return;
        }

        const dashboardClasses = dashboard.className;
        const secondaryContent = dashboard.querySelector('.bg-green-50');
        const tertiaryContent = dashboard.querySelector('.bg-purple-50');
        const sidebar = dashboard.querySelector('.bg-gray-50');

        // Check for responsive grid
        if (dashboardClasses.includes('grid')) {
            console.log('✅ Challenge 3: CSS Grid layout found');
        } else {
            challenge.errors.push('Missing grid class for dashboard layout');
        }

        if (dashboardClasses.includes('grid-cols-1')) {
            console.log('✅ Challenge 3: Mobile-first grid columns found');
        } else {
            challenge.errors.push('Missing grid-cols-1 for mobile layout');
        }

        if (dashboardClasses.includes('md:grid-cols-2')) {
            console.log('✅ Challenge 3: Tablet grid columns found');
        } else {
            challenge.warnings.push('Consider adding md:grid-cols-2 for tablet layout');
        }

        if (dashboardClasses.includes('lg:grid-cols-3')) {
            console.log('✅ Challenge 3: Desktop grid columns found');
        } else {
            challenge.warnings.push('Consider adding lg:grid-cols-3 for desktop layout');
        }

        // Check progressive disclosure
        if (secondaryContent) {
            const secondaryClasses = secondaryContent.className;
            if (secondaryClasses.includes('hidden') && secondaryClasses.includes('md:block')) {
                console.log('✅ Challenge 3: Secondary content progressive disclosure found');
            } else {
                challenge.errors.push('Secondary content should be hidden on mobile, visible on tablet+');
            }
        }

        if (tertiaryContent) {
            const tertiaryClasses = tertiaryContent.className;
            if (tertiaryClasses.includes('hidden') && tertiaryClasses.includes('lg:block')) {
                console.log('✅ Challenge 3: Tertiary content progressive disclosure found');
            } else {
                challenge.errors.push('Tertiary content should be hidden on mobile/tablet, visible on desktop');
            }
        }

        if (sidebar) {
            const sidebarClasses = sidebar.className;
            if (sidebarClasses.includes('hidden') && sidebarClasses.includes('lg:block')) {
                console.log('✅ Challenge 3: Sidebar progressive disclosure found');
            } else {
                challenge.warnings.push('Consider hiding sidebar on mobile/tablet, showing on desktop');
            }
        }

        // Check for responsive stats
        const statsContainer = dashboard.querySelector('.bg-blue-50 .mt-4');
        if (statsContainer) {
            const statsClasses = statsContainer.className;
            if (statsClasses.includes('md:flex')) {
                console.log('✅ Challenge 3: Responsive stats layout found');
            } else {
                challenge.warnings.push('Consider adding md:flex to stats for horizontal layout');
            }
        }

        challenge.passed = challenge.errors.length === 0;
    }

    /**
     * Calculate overall results
     */
    calculateOverallResults() {
        const challenges = [this.results.challenge1, this.results.challenge2, this.results.challenge3];
        const passedCount = challenges.filter(c => c.passed).length;
        const totalCount = challenges.length;

        this.results.overall.score = Math.round((passedCount / totalCount) * 100);
        this.results.overall.passed = passedCount === totalCount;

        // Additional checks for overall quality
        this.checkOverallQuality();
    }

    /**
     * Check overall code quality and best practices
     */
    checkOverallQuality() {
        // This would include checks for:
        // - Consistent use of mobile-first approach
        // - Proper semantic HTML
        // - Accessibility considerations
        // - Performance optimizations
        console.log('\n🔍 Checking overall code quality...');

        // Example quality checks
        const htmlPath = path.join(__dirname, '../lab/starter-template.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Check for mobile-first approach
        const mobileFirstPattern = /class="[^"]*\bw-full\b[^"]*\bmd:w-/;
        if (mobileFirstPattern.test(htmlContent)) {
            console.log('✅ Mobile-first approach detected');
        } else {
            console.log('⚠️  Consider using mobile-first approach more consistently');
        }

        // Check for proper breakpoint usage
        const breakpointPattern = /(sm:|md:|lg:|xl:|2xl:)/g;
        const breakpoints = htmlContent.match(breakpointPattern) || [];
        if (breakpoints.length > 0) {
            console.log(`✅ Found ${breakpoints.length} responsive utilities`);
        } else {
            console.log('❌ No responsive utilities found');
        }

        // Check for accessibility
        const altAttributes = (htmlContent.match(/alt="[^"]*"/g) || []).length;
        const images = (htmlContent.match(/<img/g) || []).length;
        if (altAttributes === images && images > 0) {
            console.log('✅ All images have alt attributes');
        } else if (images > 0) {
            console.log('⚠️  Some images are missing alt attributes');
        }
    }

    /**
     * Display validation results
     */
    displayResults() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 VALIDATION RESULTS');
        console.log('='.repeat(60));

        // Challenge results
        for (let i = 1; i <= 3; i++) {
            const challenge = this.results[`challenge${i}`];
            const status = challenge.passed ? '✅ PASSED' : '❌ FAILED';
            console.log(`\nChallenge ${i}: ${status}`);

            if (challenge.errors.length > 0) {
                console.log('  Errors:');
                challenge.errors.forEach(error => console.log(`    ❌ ${error}`));
            }

            if (challenge.warnings.length > 0) {
                console.log('  Warnings:');
                challenge.warnings.forEach(warning => console.log(`    ⚠️  ${warning}`));
            }
        }

        // Overall results
        console.log('\n' + '-'.repeat(60));
        console.log(`Overall Score: ${this.results.overall.score}%`);
        console.log(`Status: ${this.results.overall.passed ? '✅ ALL CHALLENGES PASSED' : '❌ SOME CHALLENGES FAILED'}`);

        // Recommendations
        console.log('\n💡 RECOMMENDATIONS:');
        if (this.results.overall.score === 100) {
            console.log('🎉 Excellent work! You have mastered Tailwind responsive design!');
            console.log('🚀 Try the advanced challenges or help other students.');
        } else if (this.results.overall.score >= 80) {
            console.log('👍 Great job! You have a solid understanding of responsive design.');
            console.log('✨ Polish the remaining issues to achieve mastery.');
        } else if (this.results.overall.score >= 60) {
            console.log('📚 Good progress! Review the mobile-first methodology.');
            console.log('🔄 Focus on the failing challenges and try again.');
        } else {
            console.log('📖 Keep learning! Responsive design takes practice.');
            console.log('💪 Review the lessons and work through each challenge step by step.');
        }

        // Next steps
        console.log('\n🎯 NEXT STEPS:');
        console.log('1. Fix any errors shown above');
        console.log('2. Test your design by resizing the browser window');
        console.log('3. Run the tests again with: npm test');
        console.log('4. Check the lab interface for interactive feedback');

        console.log('\n' + '='.repeat(60));
    }
}

// Run validation if called directly
if (require.main === module) {
    const validator = new ChallengeValidator();
    validator.validate().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
    });
}

module.exports = ChallengeValidator;
