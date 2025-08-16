from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hospital.services.billing_service import BillingService

billing_bp = Blueprint('billing', __name__)

@billing_bp.route('/', methods=['POST'])
@jwt_required()
def create_bill():
    data = request.get_json()
    appointment_id = data.get('appointment_id')
    patient_id = data.get('patient_id')
    total_amount = data.get('total_amount')
    payment_status = data.get('payment_status')
    insurance_claim = data.get('insurance_claim')

    bill, error = BillingService.create_bill(appointment_id, patient_id, total_amount, payment_status, insurance_claim)
    if error:
        return jsonify(error), 400
    return jsonify({
        'message': 'Bill created successfully',
        'bill_id': bill.bill_id
    }), 201

@billing_bp.route('/', methods=['GET'])
@jwt_required()
def get_bills():
    bills = BillingService.get_all_bills()
    return jsonify([{
        'bill_id': b.bill_id,
        'appointment_id': b.appointment_id,
        'patient_id': b.patient_id,
        'total_amount': str(b.total_amount),
        'payment_status': b.payment_status,
        'insurance_claim': b.insurance_claim
    } for b in bills]), 200

@billing_bp.route('/summary', methods=['GET'])
@jwt_required()
# @admin_required # Uncomment and implement this decorator for admin-only access
def get_billing_summary():
    total_revenue = BillingService.calculate_total_revenue()
    return jsonify({'total_revenue': str(total_revenue)}), 200

@billing_bp.route('/<int:bill_id>', methods=['GET'])
@jwt_required()
def get_bill(bill_id):
    bill = BillingService.get_bill_by_id(bill_id)
    if not bill:
        return jsonify({'message': 'Bill not found'}), 404
    return jsonify({
        'bill_id': bill.bill_id,
        'appointment_id': bill.appointment_id,
        'patient_id': bill.patient_id,
        'total_amount': str(bill.total_amount),
        'payment_status': bill.payment_status,
        'insurance_claim': bill.insurance_claim
    }), 200

@billing_bp.route('/<int:bill_id>', methods=['PUT'])
@jwt_required()
def update_bill(bill_id):
    data = request.get_json()
    bill = BillingService.update_bill(bill_id, data)
    if not bill:
        return jsonify({'message': 'Bill not found'}), 404
    return jsonify({
        'message': 'Bill updated successfully',
        'bill_id': bill.bill_id
    }), 200
