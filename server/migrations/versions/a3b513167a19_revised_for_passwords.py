"""revised for passwords

Revision ID: a3b513167a19
Revises: 44e85dd6b3a5
Create Date: 2024-01-23 12:45:58.629694

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3b513167a19'
down_revision = '44e85dd6b3a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(), nullable=False))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###
