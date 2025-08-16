from hospital.extensions import db
from hospital.models.medical_record import MedicalRecord
from hospital.models.patient import Patient
from hospital.models.doctor import Doctor

class MedicalRecordService:
    @staticmethod
    def add_medical_record(patient_id, doctor_id, diagnosis, prescription, lab_results):
        patient = Patient.query.get(patient_id)
        doctor = Doctor.query.get(doctor_id)
        if not patient or not doctor:
            return None, {'message': 'Patient or Doctor not found'}

        new_record = MedicalRecord(
            patient_id=patient_id,
            doctor_id=doctor_id,
            diagnosis=diagnosis,
            prescription=prescription,
            lab_results=lab_results
        )
        db.session.add(new_record)
        db.session.commit()
        return new_record, None

    @staticmethod
    def get_medical_records_by_patient(patient_id):
        return MedicalRecord.query.filter_by(patient_id=patient_id).all()

    @staticmethod
    def get_medical_record_by_id(record_id):
        return MedicalRecord.query.get(record_id)

    @staticmethod
    def update_medical_record(record_id, data):
        record = MedicalRecord.query.get(record_id)
        if not record:
            return None
        for key, value in data.items():
            setattr(record, key, value)
        db.session.commit()
        return record

    @staticmethod
    def delete_medical_record(record_id):
        record = MedicalRecord.query.get(record_id)
        if record:
            db.session.delete(record)
            db.session.commit()
            return True
        return False
