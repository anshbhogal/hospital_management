from hospital.extensions import db
from datetime import date

class MedicalRecord(db.Model):
    __tablename__ = 'medical_records'
    record_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.patient_id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'))
    record_date = db.Column(db.Date, default=date.today)
    diagnosis = db.Column(db.Text)
    prescription = db.Column(db.Text)
    lab_results = db.Column(db.Text)

    def __repr__(self):
        return f'<MedicalRecord {self.record_id} for Patient {self.patient_id}>'
