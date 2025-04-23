from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
import requests
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REALM_NAME = "ENT-Realm"
KEYCLOAK_URL = "http://localhost:8080"
CLIENT_ID = "ent-frontend"
CLIENT_SECRET = "FLEUoo5yM950E0CZSO0bJqp051urIoZm"  # optional if public client
REALM_URL = f"{KEYCLOAK_URL}/realms/{REALM_NAME}"
@app.post("/api/login")
def login(username: str = Form(...), password: str = Form(...)):
    token_url = f"{REALM_URL}/protocol/openid-connect/token"

    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,  # only if confidential
        "grant_type": "password",
        "username": username,
        "password": password,
    }

    response = requests.post(token_url, data=data)
    
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = response.json()
    access_token = token_data["access_token"]

    # Decode token to get user roles
    public_key_url = f"{REALM_URL}/protocol/openid-connect/certs"
    certs = requests.get(public_key_url).json()

    unverified_header = jwt.get_unverified_header(access_token)
    kid = unverified_header["kid"]
    key = next((k for k in certs["keys"] if k["kid"] == kid), None)

    if not key:
        raise HTTPException(status_code=400, detail="Invalid token signature")

    public_key = jwt.construct_rsa_public_key(key)
    payload = jwt.decode(access_token, public_key, algorithms=[key["alg"]], audience=CLIENT_ID)

    roles = payload.get("realm_access", {}).get("roles", [])

    # Pick a role
    if "student" in roles:
        user_role = "student"
    elif "teacher" in roles:
        user_role = "teacher"
    elif "admin" in roles:
        user_role = "admin"
    else:
        user_role = "unknown"

    return {
        "access_token": access_token,
        "role": user_role,
        "email": payload.get("email"),
        "name": payload.get("name") or payload.get("preferred_username")
    }
