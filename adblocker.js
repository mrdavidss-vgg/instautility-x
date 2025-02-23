// adblocker.js
(function () {
    'use strict';

    // Dictionary to store feature states
    let features = {
        adBlocker: true, // Enabled by default
    };

    // Load saved data from localStorage
    function loadSavedData() {
        try {
            const savedFeatures = localStorage.getItem('instaUtilityFeatures');
            if (savedFeatures) {
                features = JSON.parse(savedFeatures);
            }
        } catch (error) {
            console.error('Failed to load saved data:', error);
        }
    }

    // Save data to localStorage
    function saveData() {
        try {
            localStorage.setItem('instaUtilityFeatures', JSON.stringify(features));
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    // Create the Ad-Blocker UI
    function createUI() {
        const ui = document.createElement('div');
        ui.style.position = 'fixed';
        ui.style.top = '60px'; // Position below the main UI
        ui.style.left = '20px';
        ui.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        ui.style.color = 'white';
        ui.style.padding = '10px';
        ui.style.borderRadius = '5px';
        ui.style.zIndex = '9999';
        ui.style.display = 'flex';
        ui.style.flexDirection = 'column';
        ui.style.gap = '8px';
        ui.style.fontSize = '12px';

        // Add a title for the Ad-Blocker UI
        const title = document.createElement('span');
        title.textContent = 'Ad-Blocker';
        title.style.fontWeight = 'bold';
        title.style.color = 'white';

        // Add a toggle button for the Ad-Blocker
        const toggleButton = document.createElement('button');
        toggleButton.textContent = features.adBlocker ? 'Disable Ad-Blocker' : 'Enable Ad-Blocker';
        toggleButton.style.padding = '3px 10px';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '3px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.backgroundColor = '#2196F3'; // Blue button
        toggleButton.style.color = 'white';
        toggleButton.style.fontSize = '12px';

        // Append elements to the UI
        ui.appendChild(title);
        ui.appendChild(toggleButton);
        document.body.appendChild(ui);

        return { ui, toggleButton };
    }

    // Universal Ad-Blocker Functionality
    function enableAdBlocker() {
        const adSelectors = [
            'iframe[src*="ads"]',
            'div[class*="ad"]',
            'img[src*="ad"]',
            'script[src*="ads"]',
            'ins.adsbygoogle',
            'div.ad-banner',
            'div.ad-container',
            'div.ad-wrapper',
            'div.ad-unit',
            'div.ad-placeholder',
            'div.ad-slot',
            'div.ad-frame',
            'div.ad-popup',
            'div.ad-overlay',
            'div.ad-modal',
            'div.ad-notice',
            'div.ad-panel',
            'div.ad-sponsor',
            'div.ad-text',
            'div.ad-link',
            'div.ad-image',
            'div.ad-video',
            'div.ad-content',
            'div.ad-header',
            'div.ad-footer',
            'div.ad-sidebar',
            'div.ad-top',
            'div.ad-bottom',
            'div.ad-left',
            'div.ad-right',
            'div.ad-center',
            'div.ad-middle',
            'div.ad-full',
            'div.ad-half',
            'div.ad-quarter',
            'div.ad-third',
            'div.ad-two-thirds',
            'div.ad-three-quarters',
            'div.ad-one-third',
            'div.ad-two-thirds',
            'div.ad-one-quarter',
            'div.ad-three-quarters',
            'div.ad-one-half',
            'div.ad-one-fifth',
            'div.ad-two-fifths',
            'div.ad-three-fifths',
            'div.ad-four-fifths',
            'div.ad-one-sixth',
            'div.ad-two-sixths',
            'div.ad-three-sixths',
            'div.ad-four-sixths',
            'div.ad-five-sixths',
            'div.ad-one-seventh',
            'div.ad-two-sevenths',
            'div.ad-three-sevenths',
            'div.ad-four-sevenths',
            'div.ad-five-sevenths',
            'div.ad-six-sevenths',
            'div.ad-one-eighth',
            'div.ad-two-eighths',
            'div.ad-three-eighths',
            'div.ad-four-eighths',
            'div.ad-five-eighths',
            'div.ad-six-eighths',
            'div.ad-seven-eighths',
            'div.ad-one-ninth',
            'div.ad-two-ninths',
            'div.ad-three-ninths',
            'div.ad-four-ninths',
            'div.ad-five-ninths',
            'div.ad-six-ninths',
            'div.ad-seven-ninths',
            'div.ad-eight-ninths',
            'div.ad-one-tenth',
            'div.ad-two-tenths',
            'div.ad-three-tenths',
            'div.ad-four-tenths',
            'div.ad-five-tenths',
            'div.ad-six-tenths',
            'div.ad-seven-tenths',
            'div.ad-eight-tenths',
            'div.ad-nine-tenths',
        ];

        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(ad => {
                ad.remove(); // Remove ads from the DOM
            });
        });

        console.log('Universal Ad-Blocker enabled.');
    }

    // Initialize
    loadSavedData();
    const { toggleButton } = createUI();

    // Event listeners
    toggleButton.addEventListener('click', () => {
        features.adBlocker = !features.adBlocker;
        toggleButton.textContent = features.adBlocker ? 'Disable Ad-Blocker' : 'Enable Ad-Blocker';
        saveData();

        if (features.adBlocker) {
            enableAdBlocker();
        } else {
            alert('Ad-Blocker disabled. Refresh the page to see ads.');
        }
    });

    // Enable Ad-Blocker on script load if it's enabled
    if (features.adBlocker) {
        enableAdBlocker();
    }
})();
