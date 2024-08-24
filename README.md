# Nixcrypt - A Message Signing Tool

Nixcrypt is a simple and secure text signing tool built with Electron and Python. It allows users to sign messages with their private keys, ensuring message integrity and authenticity.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (which includes npm).
- **Python (Embeddable Package)**: You need to [download the Python 3.x embeddable package](https://www.python.org/downloads/windows/).

### Python Dependencies

This project uses the `cryptography` package for signing messages. Install it using pip:

```bash
pip install cryptography
```

## Download the installer
If you prefer not to build the application manually, you can download the pre-built installer from the [Releases](https://github.com/ShortTimeNoSee/Nixcrypt/releases).

## Build the application manually
### 1. Clone the Repository
```bash
git clone https://github.com/ShortTimeNoSee/Nixcrypt.git
cd nixcrypt
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Add the Python Embeddable Package
1. Download the Python Embeddable Package:
    * Go to the [Python Downloads page](https://www.python.org/downloads/windows/).
    * Under "Stable Releases", find the Windows embeddable package (64-bit) for Python 3.x and download the ZIP file.
2. Copy `python.exe` to the Project
    * In the ZIP, find the `python.exe` file.
    * Within your cloned repository, navigate to the `resources/` directory
    * Create a new folder inside `resources/` named `python`
    * Copy the `python.exe` file into the `resources/python/` folder

### 4. Install PyInstaller
If you don't have `pyinstaller` installed, you can install it using pip:
```bash
pip install pyinstaller
```

### 5. Compile the Python Script
Use the provided `encrypt.spec` file to generate the `encrypt.exe`:
```bash
pyinstaller encrypt.spec
```
The compiled `encrypt.exe` will be available in the `dist/` directory. Copy it to the `resources/` directory. This file will be used by the Electron application to sign messages.

### 6. Running the Application in Development
To run the app in development mode:
```bash
npm start
```

### 7. Building the Application
To create a production build of the app:
```bash
npm run build
```

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out to:
- Author: Nicholas A. Thompson
- Email: nikolaythompson@gmail.com
