// ==UserScript==
// @name         InstaUtility X
// @namespace    http://tampermonkey.net/
// @version      X
// @description  InstaUtility X with a menu-based UI, enable/disable functionality, and auto-save.
// @author       mrdavidss + pookie deepseek v3
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Wait for the DOM to load
    window.addEventListener('DOMContentLoaded', () => {
        // Dictionary to store feature states
        const features = {
            adBlocker: false,
            autoClicker: false,
        };

        // Load saved data from localStorage
        function loadSavedData() {
            try {
                const savedFeatures = localStorage.getItem('instaUtilityFeatures');
                if (savedFeatures) {
                    Object.assign(features, JSON.parse(savedFeatures));
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

        // Create the main menu UI
        function createMenuUI() {
            const menuUI = document.createElement('div');
            menuUI.style.position = 'fixed';
            menuUI.style.top = '20px';
            menuUI.style.left = '20px';
            menuUI.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            menuUI.style.color = 'white';
            menuUI.style.padding = '10px';
            menuUI.style.borderRadius = '5px';
            menuUI.style.zIndex = '9999';
            menuUI.style.display = 'flex';
            menuUI.style.flexDirection = 'column';
            menuUI.style.gap = '8px';
            menuUI.style.fontSize = '12px';

            // Add a title for the menu UI
            const menuTitle = document.createElement('span');
            menuTitle.textContent = 'InstaUtility X';
            menuTitle.style.fontWeight = 'bold';
            menuTitle.style.color = 'white';

            // Add an "AD-Blocker (Universal)" button
            const adBlockerButton = document.createElement('button');
            adBlockerButton.textContent = features.adBlocker ? 'Disable AD-Blocker' : 'Enable AD-Blocker';
            adBlockerButton.style.padding = '3px 10px';
            adBlockerButton.style.border = 'none';
            adBlockerButton.style.borderRadius = '3px';
            adBlockerButton.style.cursor = 'pointer';
            adBlockerButton.style.backgroundColor = '#2196F3'; // Blue button
            adBlockerButton.style.color = 'white';
            adBlockerButton.style.fontSize = '12px';

            // Add an "Auto-Clicker (Universal)" button
            const autoClickerButton = document.createElement('button');
            autoClickerButton.textContent = features.autoClicker ? 'Disable Auto-Clicker' : 'Enable Auto-Clicker';
            autoClickerButton.style.padding = '3px 10px';
            autoClickerButton.style.border = 'none';
            autoClickerButton.style.borderRadius = '3px';
            autoClickerButton.style.cursor = 'pointer';
            autoClickerButton.style.backgroundColor = '#2196F3'; // Blue button
            autoClickerButton.style.color = 'white';
            autoClickerButton.style.fontSize = '12px';

            // Append elements to the menu UI
            menuUI.appendChild(menuTitle);
            menuUI.appendChild(adBlockerButton);
            menuUI.appendChild(autoClickerButton);
            document.body.appendChild(menuUI);

            return { menuUI, adBlockerButton, autoClickerButton };
        }

        // Execute a script from a URL
        function executeScript(url) {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
            console.log(`Executed script from: ${url}`);
        }

        // Initialize
        loadSavedData();
        const { menuUI, adBlockerButton, autoClickerButton } = createMenuUI();

        // Event listeners
        adBlockerButton.addEventListener('click', () => {
            features.adBlocker = !features.adBlocker;
            adBlockerButton.textContent = features.adBlocker ? 'Disable AD-Blocker' : 'Enable AD-Blocker';
            saveData();

            if (features.adBlocker) {
                executeScript('https://raw.githubusercontent.com/mrdavidss-vgg/instautility-x/main/adblocker.js');
            } else {
                alert('AD-Blocker disabled. Refresh the page to see ads.');
            }
        });

        autoClickerButton.addEventListener('click', () => {
            features.autoClicker = !features.autoClicker;
            autoClickerButton.textContent = features.autoClicker ? 'Disable Auto-Clicker' : 'Enable Auto-Clicker';
            saveData();

            if (features.autoClicker) {
                executeScript('https://raw.githubusercontent.com/mrdavidss-vgg/instautility-x/main/singleclick.js');
            } else {
                alert('Auto-Clicker disabled.');
            }
        });
    });
})();
