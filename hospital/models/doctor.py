from hospital.extensions import db

class Doctor(db.Model):
    __tablename__ = 'doctors'
    doctor_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    specialization = db.Column(db.String(100))
    availability_schedule = db.Column(db.Text)

    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='doctor', lazy=True)

    def __repr__(self):
        return f'<Doctor {self.user.name}>'
