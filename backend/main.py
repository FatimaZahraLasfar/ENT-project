from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keycloak configuration
KEYCLOAK_SERVER = os.getenv("KEYCLOAK_SERVER")
REALM = os.getenv("KEYCLOAK_REALM")
CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID")
CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET")

TOKEN_URL = f"{KEYCLOAK_SERVER}/realms/{REALM}/protocol/openid-connect/token"
USERINFO_URL = f"{KEYCLOAK_SERVER}/realms/{REALM}/protocol/openid-connect/userinfo"

# Role mapping (adjust according to your Keycloak config)
ROLE_MAPPING = {
    "student": "student",
    "teacher": "teacher",
    "admin": "admin"
}


@app.post("/api/login")
def login(username: str = Form(...), password: str = Form(...)):
    # 1. Request token from Keycloak
    data = {
        "grant_type": "password",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "username": username,
        "password": password,
    }

    response = requests.post(TOKEN_URL, data=data)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = response.json()
    access_token = token_data["access_token"]

    # 2. Decode the access token to extract role
    try:
        # Get the public key (simplified for dev, ideally use introspection or JWKS)
        decoded = jwt.get_unverified_claims(access_token)
        email = decoded.get("email")
        name = decoded.get("name")
        roles = decoded.get("realm_access", {}).get("roles", [])

        # Match user role
        user_role = next((ROLE_MAPPING[r] for r in roles if r in ROLE_MAPPING), None)

        if not user_role:
            raise HTTPException(status_code=403, detail="No valid role found")

        return {
            "access_token": access_token,
            "email": email,
            "name": name,
            "role": user_role
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to decode token")
