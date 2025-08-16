from hospital.extensions import db
from hospital.models.billing import Billing
from hospital.models.patient import Patient
from hospital.models.appointment import Appointment

class BillingService:
    @staticmethod
    def create_bill(appointment_id, patient_id, total_amount, payment_status, insurance_claim):
        appointment = Appointment.query.get(appointment_id)
        patient = Patient.query.get(patient_id)
        if not appointment or not patient:
            return None, {'message': 'Appointment or Patient not found'}

        new_bill = Billing(
            appointment_id=appointment_id,
            patient_id=patient_id,
            total_amount=total_amount,
            payment_status=payment_status,
            insurance_claim=insurance_claim
        )
        db.session.add(new_bill)
        db.session.commit()
        return new_bill, None

    @staticmethod
    def get_all_bills():
        return Billing.query.all()

    @staticmethod
    def get_bill_by_id(bill_id):
        return Billing.query.get(bill_id)

    @staticmethod
    def update_bill(bill_id, data):
        bill = Billing.query.get(bill_id)
        if not bill:
            return None
        for key, value in data.items():
            setattr(bill, key, value)
        db.session.commit()
        return bill

    @staticmethod
    def delete_bill(bill_id):
        bill = Billing.query.get(bill_id)
        if bill:
            db.session.delete(bill)
            db.session.commit()
            return True
        return False

    @staticmethod
    def calculate_total_revenue():
        total_revenue = db.session.query(db.func.sum(Billing.total_amount)).scalar()
        return total_revenue if total_revenue is not None else 0