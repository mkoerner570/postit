from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    jake = User(
        username='jake', email='jake@jake.com', password='password')
    paul = User(
        username='paul', email='paul@paul.com', password='password')
    ann = User(
        username='ann', email='ann@ann.com', password='password')
    maria = User(
        username='maria', email='maria@maria.com', password='password')
    destiny = User(
        username='destiny', email='destiny@destiny.com', password='password')
    sophia = User(
        username='sophia', email='sophia@sophia.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jake)
    db.session.add(paul)
    db.session.add(ann)
    db.session.add(maria)
    db.session.add(destiny)
    db.session.add(sophia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
