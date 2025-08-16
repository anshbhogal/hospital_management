from hospital.extensions import db

class Patient(db.Model):
    __tablename__ = 'patients'
    patient_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    allergies = db.Column(db.Text)
    insurance_provider = db.Column(db.String(100))
    insurance_number = db.Column(db.String(100))

    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='patient', lazy=True)
    billings = db.relationship('Billing', backref='patient', lazy=True)

    def __repr__(self):
        return f'<Patient {self.user.name}>'
