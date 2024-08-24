import sys
import base64
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend

def load_private_key_from_string(key_string):
    try:
        private_key = serialization.load_pem_private_key(
            key_string.encode(),
            password=None,
            backend=default_backend()
        )
        return private_key
    except Exception as e:
        print(f"Error loading private key: {str(e)}", file=sys.stderr)
        raise

def sign_message(message, private_key):
    try:
        signature = private_key.sign(
            message.encode(),
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        return base64.b64encode(signature).decode('utf-8')
    except Exception as e:
        print(f"Error signing message: {str(e)}", file=sys.stderr)
        raise

if __name__ == "__main__":
    try:
        message = sys.argv[1].replace('\\n', '\n')
        private_key_pem = sys.argv[2].replace('\\n', '\n')
        private_key = load_private_key_from_string(private_key_pem)
        signature = sign_message(message, private_key)
        print(signature)
    except IndexError:
        print("Error: Not enough arguments provided.", file=sys.stderr)
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}", file=sys.stderr)