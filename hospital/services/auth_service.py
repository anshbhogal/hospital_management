from hospital.extensions import db
from hospital.models.user import User
from hospital.models.role import Role
from flask_jwt_extended import create_access_token, create_refresh_token

class AuthService:
    @staticmethod
    def register_user(name, email, password, role_name='Patient'):
        role = Role.query.filter_by(name=role_name).first()
        if not role:
            # Create role if it doesn't exist, or handle error
            role = Role(name=role_name)
            db.session.add(role)
            db.session.commit()

        if User.query.filter_by(email=email).first():
            return None, {'message': 'User with that email already exists'}

        new_user = User(name=name, email=email, role_id=role.role_id)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return new_user, None

    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.user_id)
            refresh_token = create_refresh_token(identity=user.user_id)
            user_info = user.serialize() # Serialize user object to include role
            return access_token, refresh_token, user_info, None # Return user_info
        return None, None, None, {'message': 'Invalid credentials'}
