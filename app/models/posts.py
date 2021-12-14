from .db import db


class Posts(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    image_url = db.Column(db.String(255))
    votes = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    users = db.relationship("User", back_populates="songs")
    comments = db.relationship('Comments', back_populates='songs',cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image_url': self.image_url,
            'user_id': self.user_id.
            'votes': self.votes
        }


class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    users = db.relationship("User", back_populates="comments")
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    posts = db.relationship('Song', back_populates='comments')

    content = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.song_id,
            'content': self.content,
        }
