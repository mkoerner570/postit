from app.models import db, Subs

def seed_subs():
    sub1 = Subs(
        name = 'Photos'
    )
    sub2 = Subs(
        name = 'Cats on things'
    )
    sub3 = Subs(
        name = 'Parks'
    )
    sub4 = Subs(
        name = 'Food'
    )
    sub5 = Subs(
        name = 'Dogs doing things'
    )

    db.session.add(sub1)
    db.session.add(sub2)
    db.session.add(sub3)
    db.session.add(sub4)
    db.session.add(sub5)

    db.session.commit()

def undo_subs():
    db.session.execute('TRUNCATE subs RESTART IDENTITY CASCADE;')
    db.session.commit()
