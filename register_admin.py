import requests
import json

# IMPORTANT: Replace with your actual Render backend URL
# Ensure it ends with a single slash, e.g., "https://hms-backend-hd8c.onrender.com/"
RENDER_BACKEND_URL = "https://hms-backend-hd8c.onrender.com/"

def register_admin_user(name, email, password):
    url = f"{RENDER_BACKEND_URL}/auth/register"
    headers = {"Content-Type": "application/json"}
    payload = {
        "name": name,
        "email": email,
        "password": password,
        "role_name": "Admin" 
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)
        print("Admin user registered successfully:")
        print(json.dumps(response.json(), indent=2))
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
        if response.content:
            print("Response content:")
            print(response.json())
    except requests.exceptions.ConnectionError as err:
        print(f"Error connecting to the backend: {err}")
    except requests.exceptions.Timeout as err:
        print(f"Request timed out: {err}")
    except requests.exceptions.RequestException as err:
        print(f"An unexpected error occurred: {err}")

if __name__ == "__main__":
    admin_name = "Ansh Bhogal"
    admin_email = "admin2@bhogal.com" # Changed to a new email
    admin_password = "Ansh1234" 

    print(f"Attempting to register admin user: {admin_email}")
    register_admin_user(admin_name, admin_email, admin_password)
