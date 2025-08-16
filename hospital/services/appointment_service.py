from hospital.extensions import db
from hospital.models.appointment import Appointment
from hospital.models.patient import Patient
from hospital.models.doctor import Doctor

class AppointmentService:
    @staticmethod
    def create_appointment(patient_id, doctor_id, appointment_date, notes=None):
        patient = Patient.query.get(patient_id)
        doctor = Doctor.query.get(doctor_id)
        if not patient or not doctor:
            return None, {'message': 'Patient or Doctor not found'}

        new_appointment = Appointment(
            patient_id=patient_id,
            doctor_id=doctor_id,
            appointment_date=appointment_date,
            notes=notes
        )
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment, None

    @staticmethod
    def get_all_appointments():
        return Appointment.query.all()

    @staticmethod
    def get_appointment_by_id(appointment_id):
        return Appointment.query.get(appointment_id)

    @staticmethod
    def update_appointment(appointment_id, data):
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return None
        for key, value in data.items():
            setattr(appointment, key, value)
        db.session.commit()
        return appointment

    @staticmethod
    def delete_appointment(appointment_id):
        appointment = Appointment.query.get(appointment_id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return True
        return False
