# Imports
import os
import logging

from app.model import Company, app_tz
from datetime import datetime
from app.model import Blogger
from app.model import Resume
from flask_wtf import FlaskForm, RecaptchaField
from wtforms import StringField,TextAreaField,SubmitField,PasswordField,SelectField,BooleanField,FileField
from wtforms.validators import DataRequired,Email,EqualTo,Length,Regexp,ValidationError

########################
# Welcome Forms Logger #
########################

# ------- Configuring Logging File -------- #

# Logger For Log File
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Log File Logging Format
formatter = logging.Formatter("%(asctime)s:%(levelname)s::%(message)s")

# Log File Handler
Log_File_Handler = logging.FileHandler("app/blog/logs/form.log")
Log_File_Handler.setLevel(logging.DEBUG)
Log_File_Handler.setFormatter(formatter)

# Stream Handlers
Stream_Handler = logging.StreamHandler()

# Adding The Handlers
logger.addHandler(Log_File_Handler)
logger.addHandler(Stream_Handler)

# Log On START 
logger.debug("")
logger.debug("="*100)
logger.info("Blog Forms Section :: Logging Active")
logger.debug("")

class RegisterBloggerForm(FlaskForm):
    """ Registration Form """

    fname = StringField(
        'First Name',
        validators = [
            DataRequired(message=("Please Enter First Name")),
            Regexp('^[a-zA-Z0-9]+$',message=("Name Format is not Valid"))
        ]
    )

    lname = StringField(
        'Last Name',
        validators=[
            DataRequired(message=("Please Enter Last Name")),
            Regexp('^[a-zA-Z0-9]+$',message=("Name Format is not Valid"))]
    )

    email = StringField(
        'Email',
        validators=[
            DataRequired('Please Enter an Email'),
            Email(message=('Invalid Email address.')),
            Regexp('[a-zA-Z0-9.-_]+@(gmail|neuralfarms)\.(xyz|net|farm|com|io)',message=('Email type is not authorized to register'))
        ]
    )

    password = PasswordField(
        'Password',
        validators=[
            DataRequired(message="Please enter a password."),
            Length(min=8,message=('Password is too short.')),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#-_?&])[A-Za-z\d@$#%*-_?&]{8,30}$',message=(
                """Please use a valid password format.\n
                Password allowed length is a minimum of 8 and Maximum of 30.\n
                Password characters should contain lower and upper case characters.\n
                Password should contain at least one of the following special characters '.','@','~','#','$','&','_','-' """))
        ]
    )

    confirmPassword = PasswordField(
        'Repeat Password',
        validators=[
            DataRequired(message="Re-Enter Password"),
            EqualTo('password', message='Passwords must match.'),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#-_?&])[A-Za-z\d@$#%*-_?&]{8,30}$',message=(
                """Please use a valid password format.\n
                Password allowed length is a minimum of 8 and Maximum of 30'\n
                Password characters should contain lower and upper case characters.\n
                Password should contain at least one of the following special characters '.','@','~','#','$','&'.'_','-' """))
        ]
    )

    show_password = BooleanField(
        'Show password'
        )

    position = SelectField(
        'Position',
        validators=[DataRequired(),
        ],
        choices=[
            ('Admin', 'Admin'),
            ('Editor', 'Editor'),
            ('Author', 'Author'),
            ('Proof Reader', 'Proof Reader'),
        ]
    )

    recaptcha = RecaptchaField()
    submit = SubmitField('Submit')

    def validate_email(self,email):
        response = Blogger.mail_is_available(email.data)
        if response["status"] == "failed":
            logger.debug(f"Error: {response['message']}")
            raise ValidationError(message=response["message"])


class LoginForm(FlaskForm):
    """ Login In Form """

    email = StringField(
        'Email',
        validators=[
            DataRequired('Please Enter an Email'),
            Email(message=('Invalid Email address.')),
            Regexp('[a-zA-Z0-9.-_]+@(gmail|neuralfarms)\.(xyz|net|farm|com|io)',message=('Email type is not authorized to register'))
        ]
    )

    password = PasswordField(
        'Password',
        validators=[
            DataRequired(message="Please enter a password."),
            Length(min=8,message=('Password is too short.')),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#-_?&])[A-Za-z\d@$#%*-_?&]{8,30}$',message=(
                """Please use a valid password format.\n
                Password allowed length is a minimum of 8 and Maximum of 30.\n
                Password characters should contain lower and upper case characters.\n
                Password should contain at least one of the following special characters '.','@','~','#','$','&','_','-' """))
        ]
    )

    show_password = BooleanField(
        'Show password'
        )

    submit = SubmitField('Submit')

    def validate_email(self,email):
        response = Blogger.mail_is_in_use(email.data)
        if response["status"] == "failed":
            logger.debug(f"Error: {response['message']}")
            raise ValidationError(message=response["message"])


class UploadForm(FlaskForm):
    """ Form used when uploading files """


class BloggerNameForm(FlaskForm):
    """ Form used when updating blogger names """
    fname = StringField(
        'First Name',
        validators = [
            DataRequired(message=("Please Enter First Name")),
            Regexp('^[a-zA-Z0-9]+$',message=("Name Format is not Valid"))
        ]
    )

    lname = StringField(
        'Last Name',
        validators=[
            DataRequired(message=("Please Enter Last Name")),
            Regexp('^[a-zA-Z0-9]+$',message=("Name Format is not Valid"))]
    )

    submit = SubmitField('Submit')


class BloggerEmailForm(FlaskForm):
    previousEmail = StringField(
        'Previous Email',
        validators=[
            DataRequired('Please Enter an Email'),
            Email(message=('Invalid Email address.')),
            Regexp('[a-zA-Z0-9.-_]+@(gmail|neuralfarms)\.(xyz|net|farm|com|io)',message=('Email type is not authorized to register'))
        ],
        render_kw={"disabled":"disabled"}
    )

    newEmail = StringField(
        'New Email',
        validators=[
            DataRequired('Please Enter an Email'),
            Email(message=('Invalid Email address.')),
            Regexp('[a-zA-Z0-9.-_]+@(gmail|neuralfarms)\.(xyz|net|farm|com|io)',message=('Email type is not authorized to register'))
        ]
    )

    submit = SubmitField('Submit')


class BloggerPasswordForm(FlaskForm):
    previousPassword = PasswordField(
        'Previous Password',
        validators=[
            DataRequired(message="Enter previous password."),
            Length(min=8,message=('Password is too short.')),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%-_&.])[A-Za-z\d@$%-_&.]{8,30}$',message=(
                "Please use a valid password format.."
                "Password allowed length is a minimum of 8 and Maximum of 30.."
                "Password characters should contain lower and upper case characters.."
                "Password should contain at least one of the following special characters '%', '.', '@', '$', '&', '_', '-'"))
        ]
    )

    newPassword = PasswordField(
        'New Password',
        validators=[
            DataRequired(message="Enter new password."),
            Length(min=8,message=('Password is too short.')),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%-_&.])[A-Za-z\d@$%-_&.]{8,30}$',message=(
                "Please use a valid password format.."
                "Password allowed length is a minimum of 8 and Maximum of 30.."
                "Password characters should contain lower and upper case characters.."
                "Password should contain at least one of the following special characters '%', '.', '@', '$', '&', '_', '-'"))
        ]
    )

    showPassword = BooleanField(
        'Show password'
        )
    
    submit = SubmitField('Submit')


class ResumeForm(FlaskForm):
    """
    This form is used to generate the csrf
    token used by the create resume page
    """


class ContactForm(FlaskForm):
    """
    This form is used to generate the csrf
    token used by the create resume page
    """



class EducationForm(FlaskForm):

    Name = StringField(
        "Instituition Name",
        validators=[
            DataRequired(message="Enter Instituition Name"),
            Regexp('[A-Za-z0-9,\.]',message=(
                "Name contains unwanted characters"))
        ],
        render_kw={"placeholder":"Federal University of Agriculture Abeokuta"}
    )

    Location = StringField(
        "Instituition location",
        validators=[
            DataRequired(message="Location cannot be empty"),
            Regexp('[A-Za-z0-9,\.]',message=(
                "Location contains unwanted characters"))
            ],
        render_kw={"placeholder":"Abeokuta, Ogun State"}
    )

    Start_Date = SelectField(
        "Start Date",
        validators=[
            DataRequired(message="Please select a start date")
        ],
        choices=[
            (f"{x}") for x in range(1942,int(str(datetime.now(app_tz).year))+1)
            ]
    )

    End_Date = SelectField(
        "End Date",
        validators=[
            DataRequired(message="Please select an end date")
        ],
        choices=[
            (f"{x}") for x in range(1942,int(str(datetime.now(app_tz).year))+1)
            ]
    )

    Qualification = StringField(
        "Qualification",
        validators=[
            DataRequired(message="Qualification cannot be empty"),
            Regexp('[A-Za-z0-9,\.]',message=(
                "Qualification contains unwanted charaters"))
            ],
        render_kw={"placeholder":"Bachelors of Engineering, Mechatronics Engineering"}
    )



class ExperienceForm(FlaskForm):

    CompanyName = SelectField(
        "Company Name",
        validators=[
            DataRequired(message="Please select a company")
        ],
        choices=[
            (f"{x['company_name']}".upper()) for x in Company.fetch_all_companies()["message"]["dict"]
        ]
    )

    Role = StringField(
        "Role Name",
        validators=[
            DataRequired(message="Role cannot be empty"),
            Regexp('[A-Za-z0-9,\.]',message=(
                "Role name contains unwanted charaters"))
        ],
        render_kw={"placeholder":"Backend Engineer"}
    )

    Role_description = TextAreaField(
        "Role Description",
        validators=[
            DataRequired(message=" cannot be empty"),
            Regexp('[A-Za-z0-9,\.]',message=(
                "Description contains unwanted charaters"))
        ]
    )

    Start_Month = SelectField(
        "Start Month",
        validators=[
            DataRequired(message="Please select a start date")
        ],
        choices=[
            ("1","January"),
            ("2","February"),
            ("3","March"),
            ("4","April"),
            ("5","May"),
            ("6","June"),
            ("7","July"),
            ("8","August"),
            ("9","September"),
            ("10","October"),
            ("11","November"),
            ("12","December")
            ]
    )

    Start_Year = SelectField(
        "Start Year",
        validators=[
            DataRequired(message="Please select a start date")
        ],
        choices=[
            (f"{x}") for x in range(1942,int(str(datetime.now(app_tz).year))+1)
            ]
    )

    End_Month = SelectField(
        "End Month",
        validators=[
            DataRequired(message="Please select a start date")
        ],
        choices=[
            ("1","January"),
            ("2","February"),
            ("3","March"),
            ("4","April"),
            ("5","May"),
            ("6","June"),
            ("7","July"),
            ("8","August"),
            ("9","September"),
            ("10","October"),
            ("11","November"),
            ("12","December")
            ]
    )

    End_Year = SelectField(
        "End Year",
        validators=[
            DataRequired(message="Please select an end date")
        ],
        choices=[
            (f"{x}") for x in range(1942,int(str(datetime.now(app_tz).year))+1)
            ]
    )


class CertificateForm(FlaskForm):
    
    Certificate_id = StringField(
        "Certificate ID",
        validators=[
            DataRequired(message="Certificate id required"),
        ]
    )

    Certificate_issuer = StringField(
        "Certificate Issuer",
        validators=[
            DataRequired(message="Certificate issuer required")
        ]
    )

    Certificate_name = StringField(
        "Certificate Name",
        validators=[
            DataRequired(message="Certificate name required")
        ]
    )

    Certificate_image = FileField(
        "Certificate Image",
        validators=[
            DataRequired(message="certificate image required")
        ]
    )


class StackForm(FlaskForm):

    Stack_icon = FileField(
        "Stack Icon",
    )

    Stack_name = StringField(
        "Stack Name",
        validators=[
            DataRequired(message="Stack name is required")
        ]
    )


class ProjectForm(FlaskForm):
    
    Project_name = StringField(
        "Project Name",
        validators=[
            DataRequired(message="Project name is required")
        ],
        render_kw = {"placeholder":"My Portfolio Blog"}
    )

    Project_summary = TextAreaField(
        "Project Summary",
        validators=[
            DataRequired(message="Project summary required")
        ],
        render_kw={"placeholder":"The project dscription."}
    )

    Project_link = StringField(
        "Project Link",
        validators=[
            DataRequired(message="Project link required")
        ],
        render_kw = {"placeholder":"https://www.github.com/mrnninster/my_portfolio_blog"}
    )

    Project_background_image = FileField(
        "Project Image"
    )


class SettingsForm(FlaskForm):

    upload_resume = FileField(
        "Upload Resume"
    )

    resume_image = FileField(
        "Resume Image"
    )

    name = StringField(
        "Resume Owner Name",
        render_kw={
            "placeholder":"Resume Owner Name"
        }
    )

    twitter_link = StringField(
        "Twitter Profile",
        render_kw = {
            "placeholder":"https://www.twitter.com/xxxxxxxx"
            }
    )

    linkedin_link = StringField(
        "LinkedIn Profile",
        render_kw = {
            "placeholder":"https://www.linkedin.com/in/xxxxxxx"
            }
    )

    github_link = StringField(
        "Github Profile",
        render_kw = {
            "placeholder":"https://www.github.com/xxxxxxx"
            }
    )

    email = StringField(
        "Email Address",
        render_kw = {
            "placeholder":"sample@sample_mail.com"
            }
    )


class ResetForm(FlaskForm):

    email = StringField(
        "Your Email",
        validators=[
            DataRequired(message="Email cannot be empty"),
            Email(message=('Invalid Email address.')),
            Regexp('[a-zA-Z0-9.-_]+@(gmail|neuralfarms)\.(xyz|net|farm|com|io)',message=('Email type is not authorized to register'))
        ],
        render_kw={
            "placeholder":"Enter Email Here"
        }
    )

    submit = SubmitField('Send')

    def validate_email(self,email):
        response = Blogger.mail_is_in_use(email.data)
        if response["status"] == "failed":
            logger.debug(f"Error: {response['message']}")
            raise ValidationError(message=response["message"])



class PasswordForm(FlaskForm):

    new_password = PasswordField(
        "New Password",
        validators=[
            DataRequired(message="Enter previous password."),
            Length(min=8,message=('Password is too short.')),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%-_&.])[A-Za-z\d@$%-_&.]{8,30}$',message=(
                "Please use a valid password format.."
                "Password allowed length is a minimum of 8 and Maximum of 30.."
                "Password characters should contain lower and upper case characters.."
                "Password should contain at least one of the following special characters '%', '.', '@', '$', '&', '_', '-'"))
        ]
    )

    confirm_password = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(message="Re-Enter Password"),
            EqualTo('password', message='Passwords must match.'),
            Regexp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#-_?&])[A-Za-z\d@$#%*-_?&]{8,30}$',message=(
                """Please use a valid password format.\n
                Password allowed length is a minimum of 8 and Maximum of 30'\n
                Password characters should contain lower and upper case characters.\n
                Password should contain at least one of the following special characters '.','@','~','#','$','&'.'_','-' """))
        ]
    )

    submit = SubmitField("Save")