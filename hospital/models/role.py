from hospital.extensions import db

class Role(db.Model):
    __tablename__ = 'roles'
    role_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    users = db.relationship('User', back_populates='role', lazy=True) # Use back_populates

    def __repr__(self):
        return f'<Role {self.name}>'
