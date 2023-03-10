"""empty message

Revision ID: 91a7b2f6cb2d
Revises: 
Create Date: 2022-12-29 13:38:21.951280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91a7b2f6cb2d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blogger',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(), nullable=False),
    sa.Column('Email', sa.String(), nullable=False),
    sa.Column('Password', sa.String(), nullable=False),
    sa.Column('Position', sa.String(), nullable=False),
    sa.Column('Blogger_id', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_blogger')),
    sa.UniqueConstraint('Blogger_id', name=op.f('uq_blogger_Blogger_id')),
    sa.UniqueConstraint('Email', name=op.f('uq_blogger_Email'))
    )
    op.create_table('editorspick',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Post_id', sa.String(), nullable=False),
    sa.Column('Date_Registered', sa.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_editorspick')),
    sa.UniqueConstraint('Post_id', name=op.f('uq_editorspick_Post_id'))
    )
    op.create_table('subscribers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Email', sa.String(), nullable=False),
    sa.Column('Date_Registered', sa.DATETIME(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_subscribers')),
    sa.UniqueConstraint('Email', name=op.f('uq_subscribers_Email'))
    )
    op.create_table('posts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Category', sa.String(), nullable=False),
    sa.Column('Post_Type', sa.String(), nullable=False),
    sa.Column('Post_Uuid', sa.String(), nullable=False),
    sa.Column('Content', sa.Text(), nullable=False),
    sa.Column('Title', sa.String(), nullable=False),
    sa.Column('is_draft', sa.Boolean(), nullable=False),
    sa.Column('is_published', sa.Boolean(), nullable=False),
    sa.Column('Author_uid', sa.String(), nullable=True),
    sa.Column('Date_Posted', sa.DATETIME(), nullable=False),
    sa.Column('Videos', sa.String(), nullable=False),
    sa.Column('Audios', sa.String(), nullable=False),
    sa.Column('Images', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['Author_uid'], ['blogger.Blogger_id'], name=op.f('fk_posts_Author_uid_blogger')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_posts')),
    sa.UniqueConstraint('Post_Uuid', name=op.f('uq_posts_Post_Uuid'))
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(), nullable=False),
    sa.Column('Email', sa.String(), nullable=False),
    sa.Column('comment', sa.String(), nullable=False),
    sa.Column('Post_uid', sa.String(), nullable=False),
    sa.Column('Date_Commented', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['Post_uid'], ['posts.Post_Uuid'], name=op.f('fk_comments_Post_uid_posts')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_comments'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('posts')
    op.drop_table('subscribers')
    op.drop_table('editorspick')
    op.drop_table('blogger')
    # ### end Alembic commands ###
