// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import { acceptDonation } from "../../services/donations";

// const fadeUp = {
//   hidden: { opacity: 0, y: 16 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };

// export default function NGODashboard() {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ======================
//   // FETCH PENDING DONATIONS
//   // ======================
//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const res = await api.get("/donations/pending");
//         setDonations(res.data);
//       } catch (err) {
//         setError("Failed to load donations");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   // ======================
//   // ACCEPT DONATION
//   // ======================
//   const handleAccept = async (donationId) => {
//     try {
//       await acceptDonation(donationId);

//       // Remove accepted donation from UI
//       setDonations((prev) => prev.filter((d) => d.id !== donationId));
//     } catch (err) {
//       alert(err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading donations…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50 px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADER */}
//         <motion.div variants={fadeUp} initial="hidden" animate="visible">
//           <h1 className="text-3xl font-semibold text-gray-900">
//             Available Donations
//           </h1>
//           <p className="mt-2 text-gray-600 max-w-2xl">
//             Accept donations you can distribute responsibly.
//           </p>
//         </motion.div>

//         {/* EMPTY STATE */}
//         {donations.length === 0 && (
//           <div className="mt-16 text-center text-gray-500">
//             No donations available right now.
//           </div>
//         )}

//         {/* DONATION LIST */}
//         <div className="mt-10 space-y-6">
//           {donations.map((donation, i) => (
//             <motion.div
//               key={donation.id}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               custom={i + 1}
//               className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-6"
//             >
//               <div>
//                 <h2 className="text-lg font-medium text-gray-900">
//                   {donation.product_name}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Batch: {donation.batch_number}
//                 </p>

//                 <div className="mt-3 text-sm text-gray-600 space-y-1">
//                   <div>
//                     Quantity:{" "}
//                     <span className="font-medium text-gray-900">
//                       {donation.quantity}
//                     </span>
//                   </div>
//                   <div>
//                     Expiry:{" "}
//                     <span className="font-medium text-gray-900">
//                       {new Date(donation.expiry_date).toLocaleDateString(
//                         "en-IN",
//                         {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => handleAccept(donation.id)}
//                   className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
//                 >
//                   Accept Donation
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import PendingDonationsPreview from "./PendingDonationsPreview";
import DonationHistoryPreview from "./DonationHistoryPreview";

export default function NGODashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900">
             NGO Dashboard
          </h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            Thank you for partnering with us to reduce waste and support
            communities.
          </p>
        </motion.div>

        {/* SUMMARY CARDS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard
            title="Pending Donations"
            value="View"
            subtitle="Items awaiting acceptance"
            onClick={() => navigate("/ngo/donations/pending")}
          />

          <DashboardCard
            title="Accepted Donations"
            value="History"
            subtitle="Your accepted donations"
            onClick={() => navigate("/ngo/donations/accepted")}
          />

          <DashboardCard
            title="Community Impact"
            value="❤️"
            subtitle="Every item makes a difference"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PendingDonationsPreview />
          <DonationHistoryPreview />
        </div>
      </div>
    </div>
  );
}
