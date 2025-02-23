// clicker.js
(function () {
    'use strict';

    let isClicking = false;
    let clickInterval;
    let cpsCapUnlocked = false;
    let keybind = null;
    let currentX = 0;
    let currentY = 0;

    // Load saved data from localStorage
    function loadSavedData() {
        try {
            const savedCpsCapUnlocked = localStorage.getItem('cpsCapUnlocked');
            const savedKeybind = localStorage.getItem('keybind');
            const savedCpsValue = localStorage.getItem('cpsValue');

            if (savedCpsCapUnlocked !== null) {
                cpsCapUnlocked = savedCpsCapUnlocked === 'true';
            }
            if (savedKeybind !== null) {
                keybind = savedKeybind;
            }
            if (savedCpsValue !== null) {
                cpsInput.value = savedCpsValue;
            }
        } catch (error) {
            console.error('Failed to load saved data:', error);
        }
    }

    // Save data to localStorage
    function saveData() {
        try {
            localStorage.setItem('cpsCapUnlocked', cpsCapUnlocked);
            localStorage.setItem('keybind', keybind);
            localStorage.setItem('cpsValue', cpsInput.value);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    // Create the main UI
    function createUI() {
        const ui = document.createElement('div');
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.left = '20px';
        ui.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        ui.style.color = 'white';
        ui.style.padding = '6px 12px';
        ui.style.borderRadius = '5px';
        ui.style.zIndex = '9999';
        ui.style.display = 'flex';
        ui.style.alignItems = 'center';
        ui.style.gap = '6px';
        ui.style.fontSize = '12px';
        ui.style.cursor = 'grab';

        const text = document.createElement('span');
        text.textContent = 'InstaClick X.1';
        text.style.fontSize = '12px';

        const cpsInput = document.createElement('input');
        cpsInput.type = 'number';
        cpsInput.placeholder = 'CPS';
        cpsInput.style.width = '61px';
        cpsInput.style.height = '25px'; // Set height explicitly
        cpsInput.style.padding = '3px';
        cpsInput.style.backgroundColor = 'black';
        cpsInput.style.color = 'white';
        cpsInput.style.border = '1px solid #444';
        cpsInput.min = 1;
        cpsInput.max = 100;
        cpsInput.value = 35;

        const keybindInput = document.createElement('input');
        keybindInput.type = 'text';
        keybindInput.placeholder = 'Keybind';
        keybindInput.style.width = '65px'; // Wider text box
        keybindInput.style.height = '25px'; // Match height of cpsInput
        keybindInput.style.padding = '3px';
        keybindInput.style.backgroundColor = 'black';
        keybindInput.style.color = 'white';
        keybindInput.style.border = '1px solid #444';
        keybindInput.style.fontSize = '10px'; // Smaller text size
        keybindInput.maxLength = 1;

        const button = document.createElement('button');
        button.textContent = 'Start';
        button.style.padding = '3px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#2196F3'; // Blue button
        button.style.color = 'white';
        button.style.fontSize = '12px';

        const modsButton = document.createElement('button');
        modsButton.textContent = 'Mod Menu';
        modsButton.style.padding = '3px 10px';
        modsButton.style.border = 'none';
        modsButton.style.borderRadius = '3px';
        modsButton.style.cursor = 'pointer';
        modsButton.style.backgroundColor = '#2196F3'; // Blue button
        modsButton.style.color = 'white';
        modsButton.style.fontSize = '12px';

        ui.appendChild(text);
        ui.appendChild(cpsInput);
        ui.appendChild(keybindInput);
        ui.appendChild(button);
        ui.appendChild(modsButton);
        document.body.appendChild(ui);

        return { ui, cpsInput, keybindInput, button, modsButton };
    }

    // Create the mods UI
    function createModsUI() {
        const modsUI = document.createElement('div');
        modsUI.style.position = 'fixed';
        modsUI.style.top = '20px';
        modsUI.style.left = '20px';
        modsUI.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modsUI.style.padding = '10px';
        modsUI.style.borderRadius = '5px';
        modsUI.style.zIndex = '9999';
        modsUI.style.display = 'none'; // Hidden by default
        modsUI.style.flexDirection = 'column';
        modsUI.style.gap = '8px';
        modsUI.style.fontSize = '12px';

        // Add a title for the mods UI
        const modsTitle = document.createElement('span');
        modsTitle.textContent = 'InstaMod Menu X';
        modsTitle.style.fontWeight = 'bold';

        // Add a "Break CPS Cap" button
        const breakCpsCapButton = document.createElement('button');
        breakCpsCapButton.textContent = 'Unlock CPS Cap';
        breakCpsCapButton.style.padding = '3px 10px';
        breakCpsCapButton.style.backgroundColor = '#2196F3'; // Blue button
        breakCpsCapButton.style.color = 'white';

        // Add a red "X" button to exit mods
        const exitButton = document.createElement('button');
        exitButton.textContent = 'X';
        exitButton.style.position = 'absolute';
        exitButton.style.top = '5px';
        exitButton.style.right = '5px';
        exitButton.style.width = '20px';
        exitButton.style.height = '20px';
        exitButton.style.padding = '0';
        exitButton.style.border = 'none';
        exitButton.style.borderRadius = '3px';
        exitButton.style.backgroundColor = '#ff0000';
        exitButton.style.color = 'white';
        exitButton.style.cursor = 'pointer';
        exitButton.style.display = 'flex';
        exitButton.style.alignItems = 'center';
        exitButton.style.justifyContent = 'center';

        // Append elements to the mods UI
        modsUI.appendChild(modsTitle);
        modsUI.appendChild(breakCpsCapButton);
        modsUI.appendChild(exitButton);
        document.body.appendChild(modsUI);

        return { modsUI, breakCpsCapButton, exitButton };
    }

    // Create a visible cursor
    function createCursor() {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'black';
        cursor.style.borderRadius = '25%';
        cursor.style.pointerEvents = 'none'; // Prevent cursor from blocking clicks
        cursor.style.zIndex = '10000';
        cursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursor);
        return cursor;
    }

    // Track cursor position
    function trackCursor(e) {
        currentX = e.clientX || e.touches[0].clientX;
        currentY = e.clientY || e.touches[0].clientY;
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
    }

    // Simulate clicks
    function simulateClick() {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: currentX,
            clientY: currentY
        });
        const target = document.elementFromPoint(currentX, currentY);
        if (target && !target.closest('.instaclick-ui')) { // Prevent clicks on UI elements
            target.dispatchEvent(event);
        }
    }

    // Toggle clicking
    function toggleClicking(cps) {
        if (isClicking) {
            clearInterval(clickInterval);
            button.textContent = 'Start';
            button.style.backgroundColor = '#2196F3'; // Blue button
        } else {
            // Check if CPS exceeds the limit and CPS cap is not unlocked
            if (cps > 100 && !cpsCapUnlocked) {
                alert('You went over the CPS limit of 100!');
                cpsInput.value = 100; // Reset to the maximum allowed value
                return; // Stop execution if CPS is over the limit
            }

            const actualCps = cpsCapUnlocked ? cps : Math.min(cps, 100);
            clickInterval = setInterval(simulateClick, 1000 / actualCps);
            button.textContent = 'Stop';
            button.style.backgroundColor = '#ff0000'; // Red button when active
        }
        isClicking = !isClicking;
    }

    // Initialize
    const { ui, cpsInput, keybindInput, button, modsButton } = createUI();
    const { modsUI, breakCpsCapButton, exitButton } = createModsUI();
    const cursor = createCursor();

    // Add class to UI elements for click prevention
    ui.classList.add('instaclick-ui');
    modsUI.classList.add('instaclick-ui');

    // Load saved data
    loadSavedData();

    // Apply loaded data to UI
    if (keybind) {
        keybindInput.value = keybind;
    }
    breakCpsCapButton.textContent = cpsCapUnlocked ? 'Lock CPS Cap' : 'Unlock CPS Cap';
    cpsInput.max = cpsCapUnlocked ? 1000 : 100;

    // Track cursor and touch movements
    document.addEventListener('mousemove', trackCursor);
    document.addEventListener('touchmove', trackCursor, { passive: true });

    // Event listeners
    button.addEventListener('click', () => toggleClicking(cpsInput.value));
    keybindInput.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            keybind = e.key.toUpperCase();
            keybindInput.value = keybind;
            saveData(); // Save keybind
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key.toUpperCase() === keybind && document.activeElement !== keybindInput) {
            toggleClicking(cpsInput.value);
        }
    });

    modsButton.addEventListener('click', () => {
        ui.style.display = 'none';
        modsUI.style.display = 'flex';
    });

    exitButton.addEventListener('click', () => {
        modsUI.style.display = 'none';
        ui.style.display = 'flex';
    });

    breakCpsCapButton.addEventListener('click', () => {
        cpsCapUnlocked = !cpsCapUnlocked;
        breakCpsCapButton.textContent = cpsCapUnlocked ? 'Lock CPS Cap' : 'Unlock CPS Cap';
        cpsInput.max = cpsCapUnlocked ? 1000 : 100;
        saveData(); // Save CPS cap state
    });

    // Save CPS input value when changed
    cpsInput.addEventListener('input', () => {
        if (cpsInput.value > 100 && !cpsCapUnlocked) {
            alert('You went over the CPS limit of 100!');
            cpsInput.value = 100; // Reset to the maximum allowed value
        }
        saveData(); // Save CPS value
    });
})();
