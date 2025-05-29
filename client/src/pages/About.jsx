import React from 'react';
import { motion } from 'framer-motion';

const members = [
  { name: "Nguyễn Lê Trâm Anh", id: "22716521" },
  { name: "Nguyễn Gia Bảo", id: "22691861" },
  { name: "Nguyễn Huỳnh Thế Bảo", id: "22690761" },
  { name: "Mai Trần Thanh Bình", id: "22725131" },
  { name: "Đinh Trần Công Chiến", id: "22665261" }
];

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Danh sách thành viên
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-100">
                <th className="px-4 py-2 font-semibold">Họ và tên</th>
                <th className="px-4 py-2 font-semibold">MSSV</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
