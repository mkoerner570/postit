from .db import db


class Posts(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String(255))
    votes = db.Column(db.Integer)

    sub_id = db.Column(db.Integer, db.ForeignKey("subs.id"))
    # subs = db.relationship("Subs",back_populates="posts")

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    users = db.relationship("User", back_populates="posts")
    comments = db.relationship('Comments', back_populates='posts',cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            'votes': self.votes,
            'sub_id': self.sub_id
        }


class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    users = db.relationship("User", back_populates="comments")
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    posts = db.relationship('Posts', back_populates='comments')
    votes = db.Column(db.Integer)

    content = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'content': self.content,
        }

class Subs(db.Model):
    __tablename__ = 'subs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # posts = db.relationship('Posts', back_populates='subs')

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
        }
