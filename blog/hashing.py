from passlib.context import CryptContext

class Hash():
    def __init__(self):
        self.pwd_cxt = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

    def bcrypt(self, password: str):
        hashedPassword = self.pwd_cxt.hash(password)
        return hashedPassword