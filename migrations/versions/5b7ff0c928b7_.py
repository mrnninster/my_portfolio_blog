"""empty message

Revision ID: 5b7ff0c928b7
Revises: 0b8e977a88b6
Create Date: 2023-01-10 02:53:10.791414

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b7ff0c928b7'
down_revision = '0b8e977a88b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('education')
    op.drop_table('resume')
    op.drop_table('languages')
    op.drop_table('contact')
    op.drop_table('skills')
    op.drop_table('certifications')
    op.drop_table('roles')
    op.drop_table('company')
    op.drop_table('projects')
    op.drop_table('experience')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('experience',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Company_uuid', sa.VARCHAR(), nullable=False),
    sa.Column('Company_name', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_experience')
    )
    op.create_table('projects',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('project_link', sa.VARCHAR(), nullable=False),
    sa.Column('project_image', sa.VARCHAR(), nullable=False),
    sa.Column('project_description', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_projects')
    )
    op.create_table('company',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Company_name', sa.VARCHAR(), nullable=False),
    sa.Column('Company_uuid', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_company')
    )
    op.create_table('roles',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Role_uid', sa.VARCHAR(), nullable=False),
    sa.Column('Start_year', sa.DATETIME(), nullable=False),
    sa.Column('End_year', sa.VARCHAR(), nullable=False),
    sa.Column('Role_name', sa.VARCHAR(), nullable=False),
    sa.Column('Role_description', sa.VARCHAR(), nullable=False),
    sa.ForeignKeyConstraint(['Role_uid'], ['experience.Company_uuid'], ),
    sa.PrimaryKeyConstraint('id', name='pk_roles')
    )
    op.create_table('certifications',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('certificate_id', sa.VARCHAR(), nullable=False),
    sa.Column('certificate_name', sa.VARCHAR(), nullable=False),
    sa.Column('certificate_issuer', sa.VARCHAR(), nullable=False),
    sa.Column('certificte_image', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_certifications')
    )
    op.create_table('skills',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('skill_name', sa.VARCHAR(), nullable=False),
    sa.Column('skill_icon', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_skills')
    )
    op.create_table('contact',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Name', sa.VARCHAR(), nullable=False),
    sa.Column('Email', sa.VARCHAR(), nullable=False),
    sa.Column('Message', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_contact')
    )
    op.create_table('languages',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('language', sa.VARCHAR(), nullable=False),
    sa.Column('Proficiency', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_languages')
    )
    op.create_table('resume',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Hero_content', sa.TEXT(), nullable=False),
    sa.Column('About_content', sa.TEXT(), nullable=False),
    sa.Column('Email', sa.VARCHAR(), nullable=False),
    sa.Column('linkedin', sa.VARCHAR(), nullable=False),
    sa.Column('Work_content', sa.TEXT(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_resume')
    )
    op.create_table('education',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('Start_year', sa.DATETIME(), nullable=False),
    sa.Column('End_year', sa.DATETIME(), nullable=False),
    sa.Column('Instituition', sa.VARCHAR(), nullable=False),
    sa.Column('Location', sa.VARCHAR(), nullable=False),
    sa.Column('Qualification', sa.TEXT(), nullable=False),
    sa.PrimaryKeyConstraint('id', name='pk_education')
    )
    # ### end Alembic commands ###