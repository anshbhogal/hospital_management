from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hospital.services.medical_record_service import MedicalRecordService
from datetime import date

medical_record_bp = Blueprint('medical_records', __name__)

@medical_record_bp.route('/', methods=['POST'])
@jwt_required()
def add_record():
    data = request.get_json()
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    diagnosis = data.get('diagnosis')
    prescription = data.get('prescription')
    lab_results = data.get('lab_results')

    record, error = MedicalRecordService.add_medical_record(patient_id, doctor_id, diagnosis, prescription, lab_results)
    if error:
        return jsonify(error), 400
    return jsonify({
        'message': 'Medical record added successfully',
        'record_id': record.record_id
    }), 201

@medical_record_bp.route('/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_records_by_patient(patient_id):
    records = MedicalRecordService.get_medical_records_by_patient(patient_id)
    return jsonify([{
        'record_id': r.record_id,
        'patient_id': r.patient_id,
        'doctor_id': r.doctor_id,
        'record_date': str(r.record_date),
        'diagnosis': r.diagnosis,
        'prescription': r.prescription,
        'lab_results': r.lab_results
    } for r in records]), 200

@medical_record_bp.route('/record/<int:record_id>', methods=['GET'])
@jwt_required()
def get_record(record_id):
    record = MedicalRecordService.get_medical_record_by_id(record_id)
    if not record:
        return jsonify({'message': 'Medical record not found'}), 404
    return jsonify({
        'record_id': record.record_id,
        'patient_id': record.patient_id,
        'doctor_id': record.doctor_id,
        'record_date': str(record.record_date),
        'diagnosis': record.diagnosis,
        'prescription': record.prescription,
        'lab_results': record.lab_results
    }), 200

@medical_record_bp.route('/record/<int:record_id>', methods=['PUT'])
@jwt_required()
def update_record(record_id):
    data = request.get_json()
    record = MedicalRecordService.update_medical_record(record_id, data)
    if not record:
        return jsonify({'message': 'Medical record not found'}), 404
    return jsonify({
        'message': 'Medical record updated successfully',
        'record_id': record.record_id
    }), 200

@medical_record_bp.route('/record/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_record(record_id):
    if MedicalRecordService.delete_medical_record(record_id):
        return jsonify({'message': 'Medical record deleted successfully'}), 200
    return jsonify({'message': 'Medical record not found'}), 404
