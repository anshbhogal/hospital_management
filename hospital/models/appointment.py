from hospital.extensions import db
from datetime import datetime

class Appointment(db.Model):
    __tablename__ = 'appointments'
    appointment_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.patient_id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'))
    appointment_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default='Scheduled')
    notes = db.Column(db.Text)

    billing = db.relationship('Billing', backref='appointment', uselist=False)

    def __repr__(self):
        return f'<Appointment {self.appointment_id} on {self.appointment_date}>'
