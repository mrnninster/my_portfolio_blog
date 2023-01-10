"""empty message

Revision ID: cf91172db1c3
Revises: 5b7ff0c928b7
Create Date: 2023-01-10 02:54:15.776971

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf91172db1c3'
down_revision = '5b7ff0c928b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('certifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Certificate_id', sa.String(), nullable=False),
    sa.Column('Certificate_name', sa.String(), nullable=False),
    sa.Column('Certificate_issuer', sa.String(), nullable=False),
    sa.Column('Certificate_image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_certifications')),
    sa.UniqueConstraint('Certificate_id', name=op.f('uq_certifications_Certificate_id'))
    )
    op.create_table('company',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Company_name', sa.String(), nullable=False),
    sa.Column('Company_uuid', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_company')),
    sa.UniqueConstraint('Company_uuid', name=op.f('uq_company_Company_uuid'))
    )
    op.create_table('contact',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Contact_id', sa.String(), nullable=False),
    sa.Column('Name', sa.String(), nullable=False),
    sa.Column('Email', sa.String(), nullable=False),
    sa.Column('Message', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_contact')),
    sa.UniqueConstraint('Contact_id', name=op.f('uq_contact_Contact_id'))
    )
    op.create_table('education',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('record_id', sa.String(), nullable=False),
    sa.Column('Start_year', sa.DATETIME(), nullable=False),
    sa.Column('End_year', sa.DATETIME(), nullable=False),
    sa.Column('Instituition', sa.String(), nullable=False),
    sa.Column('Location', sa.String(), nullable=False),
    sa.Column('Qualification', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_education')),
    sa.UniqueConstraint('record_id', name=op.f('uq_education_record_id'))
    )
    op.create_table('languages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Language', sa.String(), nullable=False),
    sa.Column('Language_id', sa.String(), nullable=False),
    sa.Column('Proficiency', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_languages')),
    sa.UniqueConstraint('Language_id', name=op.f('uq_languages_Language_id'))
    )
    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Project_id', sa.String(), nullable=False),
    sa.Column('Project_link', sa.String(), nullable=False),
    sa.Column('Project_image', sa.String(), nullable=False),
    sa.Column('Project_description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_projects')),
    sa.UniqueConstraint('Project_id', name=op.f('uq_projects_Project_id'))
    )
    op.create_table('resume',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Hero_content', sa.Text(), nullable=False),
    sa.Column('About_content', sa.Text(), nullable=False),
    sa.Column('Email', sa.String(), nullable=False),
    sa.Column('twitter', sa.String(), nullable=False),
    sa.Column('github', sa.String(), nullable=False),
    sa.Column('linkedin', sa.String(), nullable=False),
    sa.Column('Work_content', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_resume'))
    )
    op.create_table('skills',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Skill_uid', sa.String(), nullable=False),
    sa.Column('Skill_name', sa.String(), nullable=False),
    sa.Column('Skill_icon', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_skills')),
    sa.UniqueConstraint('Skill_uid', name=op.f('uq_skills_Skill_uid'))
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('Role_id', sa.String(), nullable=False),
    sa.Column('Start_year', sa.DATETIME(), nullable=False),
    sa.Column('End_year', sa.DATETIME(), nullable=False),
    sa.Column('Role_name', sa.String(), nullable=False),
    sa.Column('Role_description', sa.String(), nullable=False),
    sa.Column('Company_uid', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['Company_uid'], ['company.Company_uuid'], name=op.f('fk_roles_Company_uid_company')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_roles')),
    sa.UniqueConstraint('Role_id', name=op.f('uq_roles_Role_id'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('roles')
    op.drop_table('skills')
    op.drop_table('resume')
    op.drop_table('projects')
    op.drop_table('languages')
    op.drop_table('education')
    op.drop_table('contact')
    op.drop_table('company')
    op.drop_table('certifications')
    # ### end Alembic commands ###
