"""empty message

Revision ID: 33aace95e83d
Revises: 0db65a3a3ebc
Create Date: 2021-12-17 19:18:18.024245

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '33aace95e83d'
down_revision = '0db65a3a3ebc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('votes', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comments', 'votes')
    # ### end Alembic commands ###
