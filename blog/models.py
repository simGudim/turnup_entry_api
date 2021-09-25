from sqlalchemy.sql.schema import ForeignKey
from .utils.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer)
    title = Column(String)
    body = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    creater = relationship("User", back_populates="blogs")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    blogs = relationship("Blog", back_populates="creater")