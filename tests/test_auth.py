import requests
import json

BASE_URL = "http://127.0.0.1:5000"

def register_user(name, email, password, role_name="Patient"):
    url = f"{BASE_URL}/auth/register"
    headers = {"Content-Type": "application/json"}
    data = {
        "name": name,
        "email": email,
        "password": password,
        "role_name": role_name
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(f"Register User Status Code: {response.status_code}")
    print(f"Register User Response: {response.json()}")
    return response

def login_user(email, password):
    url = f"{BASE_URL}/auth/login"
    headers = {"Content-Type": "application/json"}
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(f"Login User Status Code: {response.status_code}")
    print(f"Login User Response: {response.json()}")
    return response

if __name__ == "__main__":
    # Test Registration
    print("\n--- Testing User Registration ---")
    register_response = register_user("John Doe", "john.doe@example.com", "password123", "Admin")
    if register_response.status_code == 201:
        print("User registered successfully.")
    elif register_response.status_code == 400 and "User with that email already exists" in str(register_response.json()):
        print("User already exists, proceeding to login.")
    else:
        print("User registration failed.")

    # Test Login
    print("\n--- Testing User Login ---")
    login_response = login_user("john.doe@example.com", "password123")
    if login_response.status_code == 200:
        print("User logged in successfully.")
        access_token = login_response.json().get("access_token")
        refresh_token = login_response.json().get("refresh_token")
        print(f"Access Token: {access_token[:30]}...")
        print(f"Refresh Token: {refresh_token[:30]}...")
    else:
        print("User login failed.")
