from app.models import db, Posts

def seed_posts():
    post1 = Posts(
        user_id='2',sub_id='1',title='winter',body='',votes=2
    )
    post2 = Posts(
        user_id='4',sub_id='4',title='What I ate tonight',body='',votes=4
    )
    post3 = Posts(
        user_id='5',sub_id='4',title='breakfast tomorrow',body='',votes=1
    )
    post4 = Posts(
        user_id='3',sub_id='5',title='Got up there somehow',body='',votes=3
    )
    post5 = Posts(
        user_id='9',sub_id='2',title='on her bed',body='',votes=10
    )
    post6 = Posts(
        user_id='9',sub_id='2',title='on the lookout',body='',votes=5
    )
    post7 = Posts(
        user_id='9',sub_id='2',title='on me',body='',votes=6
    )
    post8 = Posts(
        user_id='4',sub_id='3',title='By my home',body='',votes=6
    )
    post9 = Posts(
        user_id='8',sub_id='4',title='making lunch',body='',votes=3
    )
    post10 = Posts(
        user_id='5',sub_id='1',title='favorite shot',body='',votes=1
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
