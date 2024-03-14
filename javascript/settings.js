
let globalSettings = {
  generalSettings: {},
  accountSettings: {},
  securitySettings: {}
};

// Function to show the tab content based on the selected tab
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Show the selected tab content
    const selectedTabContent = document.getElementById(tabName + 'Tab');
    if (selectedTabContent) {
        selectedTabContent.style.display = 'block';
    }
}

// Show the General tab by default
showTab('general');

function saveAndDownloadSettings(settings, fileName) {
    // Convert settings object to JSON format
    const settingsJSON = JSON.stringify(settings);

    // Create a blob containing the JSON data
    const blob = new Blob([settingsJSON], { type: 'application/json' });

    // Create a link element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Trigger the download
    downloadLink.click();
}

function displayLoadedSettings(settings) {
    // Update the General Settings section
    if (settings.theme) {
      const themeRadios = document.querySelectorAll('input[name="theme"]');
      themeRadios.forEach((radio) => {
        if (radio.value === settings.theme) {
          radio.checked = true;
        }
      });
    }
  
    if (settings.buttonStyle) {
      const buttonStyleRadios = document.querySelectorAll('input[name="buttonStyle"]');
      buttonStyleRadios.forEach((radio) => {
        if (radio.value === settings.buttonStyle) {
          radio.checked = true;
        }
      });
    }
  
    if (settings.fontStyle) {
      const fontStyleRadios = document.querySelectorAll('input[name="fontStyle"]');
      fontStyleRadios.forEach((radio) => {
        if (radio.value === settings.fontStyle) {
          radio.checked = true;
        }
      });
    }
  
    // Update the Account Settings section
    if (settings.username) {
      document.getElementById('username').value = settings.username;
    }
  
    if (settings.email) {
      document.getElementById('email').value = settings.email;
    }
  
    if (settings.password) {
      document.getElementById('password').value = settings.password;
    }
  
    // Update the Security Settings section
    if (settings.enableTwoFactorAuth !== undefined) {
      document.getElementById('enableTwoFactorAuth').checked = settings.enableTwoFactorAuth;
    }
  
    if (settings.enableCaptcha !== undefined) {
      document.getElementById('enableCaptcha').checked = settings.enableCaptcha;
    }
}

  function getSettings() {
    const generalSettings = {
      theme: getRadioValue('input[name="theme"]', 'light'),
      buttonStyle: getRadioValue('input[name="buttonStyle"]', 'rounded'),
      fontStyle: getRadioValue('input[name="fontStyle"]', 'default'),
    };
  
    const accountSettings = {
      username: document.getElementById('username')?.value || '',
      email: document.getElementById('email')?.value || '',
      password: document.getElementById('password')?.value || '',
    };
  
    const securitySettings = {
      enableTwoFactorAuth: document.getElementById('enableTwoFactorAuth')?.checked || false,
      enableCaptcha: document.getElementById('enableCaptcha')?.checked || false,
    };
  
    const allSettings = {
      generalSettings,
      accountSettings,
      securitySettings,
    };
  
    return allSettings;
  }
  
  function getRadioValue(selector, defaultValue) {
    const radioElements = document.querySelectorAll(selector);
    const selectedRadio = Array.from(radioElements).find(radio => radio.checked);
    return selectedRadio ? selectedRadio.value : defaultValue;
  }

function loadAccountSettings() {
    const fileInput = document.getElementById('accountFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const settings = JSON.parse(reader.result);
                displayLoadedSettings(settings);
                showSuccessMessage('Settings loaded successfully!', 'loadAccount');
            } catch (error) {
                console.error('Error parsing JSON file:', error);
            }
        };
        reader.readAsText(file);
    } else {
        console.error('No file selected.');
    }
}

function saveSettingsToFile() {
    const allSettings = globalSettings;
    const settingsJSON = JSON.stringify(allSettings, null, 2);
    const blob = new Blob([settingsJSON], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'all_settings.json';
    downloadLink.click();
    showGlobalSuccessMessage('Settings saved successfully!');
}

  function submitGeneralSettings() {
    const theme = document.querySelector('input[name="theme"]:checked').value;
    const buttonStyle = document.querySelector('input[name="buttonStyle"]:checked').value;
    const fontStyle = document.querySelector('input[name="fontStyle"]:checked').value;
    const settings = { theme, buttonStyle, fontStyle };
    globalSettings.generalSettings = settings;
    showSuccessMessage('General settings updated successfully!', 'general');
}

function submitAccountSettings() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const settings = { username, email, password };
    globalSettings.accountSettings = settings;
    showSuccessMessage('Account settings updated successfully!', 'account');
}

function submitSecuritySettings() {
    const enableTwoFactorAuth = document.getElementById('enableTwoFactorAuth').checked;
    const enableCaptcha = document.getElementById('enableCaptcha').checked;
    const settings = { enableTwoFactorAuth, enableCaptcha };
    globalSettings.securitySettings = settings;
    showSuccessMessage('Security settings updated successfully!', 'security');
}

function showSuccessMessage(message, tabName) {
  const successMessageDiv = document.getElementById(`${tabName}SuccessMessage`);
  if (successMessageDiv) {
      // Delay the execution of the success message display
      setTimeout(() => {
          successMessageDiv.textContent = message;
          successMessageDiv.style.display = 'block';
          // Hide the success message after 3 seconds
          setTimeout(() => {
              successMessageDiv.style.display = 'none';
          }, 3000);
      }, 0);
  } else {
      console.error(`Element with ID "${tabName}SuccessMessage" not found.`);
  }
}