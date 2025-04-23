from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import jwt
from jwt import PyJWKClient

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Keycloak configuration
KEYCLOAK_URL = "http://192.168.1.40:8080"
REALM = "ENT-Realm"
CLIENT_ID = "ent-frontend"
CLIENT_SECRET = "FLEUoo5yM950E0CZSO0bJqp051urIoZm"  # optional if public client

# JWKS client for token verification
jwks_url = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"
jwks_client = PyJWKClient(jwks_url)

class UserLogin(BaseModel):
    username: str
    password: str

class TokenData(BaseModel):
    access_token: str
    token_type: str

async def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        data = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={
                "verify_exp": True,
                "verify_aud": False,  # Disable audience verification
                "verify_iss": True
            }
        )
        
        # Manual audience verification if needed
        if CLIENT_ID not in data.get("aud", []):
            print(f"Warning: Token audience {data.get('aud')} doesn't match client ID {CLIENT_ID}")
        
        return {
            "email": data.get("email"),
            "roles": data.get("realm_access", {}).get("roles", []),
            "name": data.get("name") or data.get("preferred_username")
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.post("/api/login")
async def login(user: UserLogin):
    # Authenticate with Keycloak
    token_url = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token"
    
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "username": user.username,
        "password": user.password,
        "grant_type": "password"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(token_url, data=data)
            response.raise_for_status()
            tokens = response.json()
            
            # Get user info to extract roles
            user_info = await get_current_user(tokens["access_token"])
            
            # Determine the highest role (priority: admin > teacher > student)
            role = "student"  # default
            if "admin" in user_info["roles"]:
                role = "admin"
            elif "teacher" in user_info["roles"]:
                role = "teacher"
                
            return {
                "access_token": tokens["access_token"],
                "refresh_token": tokens.get("refresh_token", ""),
                "name": user_info["name"],
                "email": user_info["email"],
                "role": role
            }
            
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/protected")
async def protected_route(user: dict = Depends(get_current_user)):
    # Check for required roles
    if "admin" not in user["roles"]:
        raise HTTPException(status_code=403, detail="Admin access required")
    return {"message": "Admin access granted", "user": user}

