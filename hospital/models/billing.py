from hospital.extensions import db

class Billing(db.Model):
    __tablename__ = 'billing'
    bill_id = db.Column(db.Integer, primary_key=True)
    appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.appointment_id'))
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.patient_id'))
    total_amount = db.Column(db.DECIMAL(10, 2))
    payment_status = db.Column(db.String(50))
    insurance_claim = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Billing {self.bill_id} for Patient {self.patient_id}>'
