window.electron.signMessage = async (message, privateKey) => {
    try {
        const signature = await window.electron.ipcRenderer.invoke('sign-message', message, privateKey);
        return signature;
    } catch (error) {
        console.error(`Error: ${error}`);
        // Remove the "Error invoking remote method 'sign-message': " part
        const cleanedError = error.message.replace("Error invoking remote method 'sign-message': ", "");
        throw new Error(cleanedError); // Re-throw with cleaned message
    }
};

document.getElementById('sign-button').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    const privateKey = document.getElementById('private-key').value;

    if (!message) {
        showModal('Please enter a message to sign.');
        return;
    }

    if (!privateKey) {
        showModal('Please paste your private key.');
        return;
    }

    window.electron.signMessage(message, privateKey)
        .then((signature) => {
            document.getElementById('signature').value = signature;
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
            // Directly show the cleaned error message
            const finalErrorMessage = error.message.replace("Error invoking remote method 'sign-message': ", "");
            showModal(finalErrorMessage);
        });
});

function showModal(message) {
    const modal = document.getElementById('alert-modal');
    modal.style.display = 'block';
    document.querySelector('.modal-content p').textContent = message;

    const closeButton = document.querySelector('.close');
    const okButton = document.getElementById('modal-ok-button');

    closeButton.onclick = closeModal;
    okButton.onclick = closeModal;

    function closeModal() {
        modal.style.display = 'none';
        document.getElementById('message').focus();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.getElementById('message').focus();
        }
    }
}