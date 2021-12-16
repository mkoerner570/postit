from app.models import db, Comments

def seed_comments():
    comment1 = Comments(
        post_id='6',user_id='4',body='',votes=4
    )
    comment2 = Comments(
        post_id='10',user_id='3',body='',votes=3
    )
    comment3 = Comments(
        post_id='9',user_id='6',body='',votes=2
    )
    comment4 = Comments(
        post_id='2',user_id='4',body='',votes=5
    )
    comment5 = Comments(
        post_id='5',user_id='4',body='Naturally, surveying everything',votes=3
    )
    comment6 = Comments(
        post_id='5',user_id='3',body='Her favorite place, I take it?',votes=6
    )
    comment7 = Comments(
        post_id='7',user_id='4',body='AW! She is adorable',votes=1
    )
    comment8 = Comments(
        post_id='7',user_id='5',body='so cute!',votes=3
    )
    comment9 = Comments(
        post_id='3',user_id='8',body='Nice!',votes=3
    )
    comment10 = Comments(
        post_id='6',user_id='8',body='Ever watchful',votes=4
    )
    comment11 = Comments(
        post_id='1',user_id='5',body='Looks nice and cold',votes=3
    )
    comment12 = Comments(
        post_id='8',user_id='4',body='just serene',votes=1
    )
    comment13 = Comments(
        post_id='4',user_id='6',body='',votes=2
    )
    comment14 = Comments(
        post_id='3',user_id='7',body='is it gluten free?',votes=0
    )
    comment15 = Comments(
        post_id='10',user_id='4',body='Love how it turned out!',votes=3
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)



def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
