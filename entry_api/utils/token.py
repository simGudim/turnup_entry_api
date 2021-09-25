from .. import schema
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Optional, Tuple

# TODO: this will need to go to Vault eventually
SECRET_KEY = "fh89qwhopgf789bhsopefh8as9pdvgashg89ahdsg"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 200

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception: Tuple):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schema.TokenData(username=username)
    except JWTError:
        raise credentials_exception



