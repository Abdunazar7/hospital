import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class ReportsService {
  constructor(private readonly sequelize: Sequelize) {}

  // 1 Eng ko‘p appointment qilgan shifokorlar
  async topDoctors() {
    const [rows] = await this.sequelize.query(`
      SELECT 
        d.id AS doctor_id,
        u.full_name AS doctor_name,
        COUNT(a.id) AS total_appointments
      FROM doctors d
      JOIN users u ON u.id = d.user_id
      JOIN appointments a ON a.doctor_id = d.id
      GROUP BY d.id, u.full_name
      ORDER BY total_appointments DESC
      LIMIT 5;
    `);
    return rows;
  }

  // 2 Eng ko‘p to‘lov qilgan bemorlar
  async topPatients() {
    const [rows] = await this.sequelize.query(`
      SELECT 
        p.id AS patient_id,
        u.full_name AS patient_name,
        COALESCE(SUM(pay.amount), 0) AS total_paid
      FROM patients p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN payments pay ON pay.patient_id = p.id
      GROUP BY p.id, u.full_name
      ORDER BY total_paid DESC
      LIMIT 5;
    `);
    return rows;
  }

  // 3️ Oylar kesimida umumiy tushum
  async monthlyRevenue() {
    const [rows] = await this.sequelize.query(`
      SELECT 
        TO_CHAR(pay.payment_date, 'YYYY-MM') AS month,
        SUM(pay.amount) AS total_revenue
      FROM payments pay
      GROUP BY TO_CHAR(pay.payment_date, 'YYYY-MM')
      ORDER BY month;
    `);
    return rows;
  }

  // 4️ Shifokorlar faoliyat statistikasi
  async doctorPerformance() {
    const [rows] = await this.sequelize.query(`
      SELECT 
        d.id AS doctor_id,
        u.full_name AS doctor_name,
        COUNT(DISTINCT a.id) AS total_appointments,
        COUNT(DISTINCT mr.id) AS total_medical_records,
        COUNT(DISTINCT lt.id) AS total_lab_tests
      FROM doctors d
      JOIN users u ON u.id = d.user_id
      LEFT JOIN appointments a ON a.doctor_id = d.id
      LEFT JOIN medical_records mr ON mr.appointment_id = a.id
      LEFT JOIN lab_tests lt ON lt.doctor_id = d.id
      GROUP BY d.id, u.full_name
      ORDER BY total_appointments DESC;
    `);
    return rows;
  }

  // 5️ Lab testlar statistikasi
  async labTestStats() {
    const [rows] = await this.sequelize.query(`
      SELECT 
        status,
        COUNT(*) AS total_tests
      FROM lab_tests
      GROUP BY status
      ORDER BY total_tests DESC;
    `);
    return rows;
  }
}
