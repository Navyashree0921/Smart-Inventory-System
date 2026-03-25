import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-amber-50 text-gray-800 overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-green-900">
            Turn surplus food into
            <span className="block text-emerald-600 mt-2">shared hope</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
            A calm, intelligent platform helping retailers reduce food waste,
            predict expiry, and donate surplus food to NGOs — creating impact
            instead of loss.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="px-7 py-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-7 py-3 rounded-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Content — Typography Driven */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-200/40 to-amber-200/40 rounded-3xl blur-3xl" />

          <div className="relative bg-white/75 backdrop-blur-xl rounded-3xl p-10 shadow-xl">
            <ul className="space-y-7">
              {[
                "Track inventory and expiry with clarity and confidence",
                "Use intelligent predictions to reduce unnecessary waste",
                "Connect seamlessly with NGOs for meaningful redistribution",
                "Turn everyday responsibility into real social impact",
              ].map((text, index) => (
                <li key={index} className="pl-4 border-l border-emerald-200">
                  <p className="text-gray-700 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center text-green-900"
        >
          How it works
        </motion.h2>

        <div className="mt-14 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Track & Predict",
              desc: "Monitor inventory, expiry, and demand using calm, intelligent insights.",
            },
            {
              title: "Receive Alerts",
              desc: "Get gentle, timely alerts before food approaches expiry.",
            },
            {
              title: "Donate with Purpose",
              desc: "Redirect surplus food to NGOs through a respectful, simple flow.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-green-800">
                {step.title}
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-14 shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-white">
            Every saved meal matters
          </h2>

          <p className="mt-4 text-emerald-100 text-lg">
            Small actions today can nourish many tomorrow.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 px-8 py-3 bg-white text-emerald-700 rounded-full font-medium shadow-md hover:shadow-lg hover:bg-emerald-50 transition"
          >
            Start Making an Impact
          </Link>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-sm text-gray-500">
        Built with care for sustainability, dignity, and social good.
      </footer>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const fadeUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.15,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   }),
// };

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-gray-800">
//       {/* HERO SECTION */}
//       <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
//         <motion.h1
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900 max-w-xl"
//         >
//           Reducing waste. <br />
//           <span className="text-emerald-600">Feeding hope.</span>
//         </motion.h1>

//         <motion.p
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={2}
//           className="mt-6 text-lg text-gray-600 max-w-xl"
//         >
//           A unified platform that helps retailers responsibly manage surplus and
//           near-expiry goods — connecting them to NGOs and communities that need
//           them most.
//         </motion.p>

//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           custom={3}
//           className="mt-10"
//         >
//           <Link
//             to="/login"
//             className="inline-block px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium shadow-sm hover:bg-emerald-700 transition"
//           >
//             Sign in to contribute
//           </Link>
//         </motion.div>
//       </section>

//       {/* IMPACT STATS */}
//       <section className="bg-white py-16 border-t border-gray-100">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
//           {[
//             { label: "Items Saved", value: "12,480+" },
//             { label: "Donations Completed", value: "1,320+" },
//             { label: "NGOs Supported", value: "38" },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//               className="space-y-2"
//             >
//               <div className="text-3xl font-semibold text-emerald-600">
//                 {stat.value}
//               </div>
//               <div className="text-gray-600">{stat.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ROLE PATHWAYS */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <motion.h2
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-2xl font-semibold text-gray-900 text-center"
//         >
//           Choose how you contribute
//         </motion.h2>

//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Shopkeeper",
//               desc: "Manage inventory responsibly and donate surplus items before they go to waste.",
//             },
//             {
//               title: "NGO",
//               desc: "Discover available donations nearby and help communities in need.",
//             },
//             {
//               title: "Administrator",
//               desc: "Ensure transparency, trust, and smooth system operation.",
//             },
//           ].map((role, i) => (
//             <motion.div
//               key={role.title}
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               custom={i}
//               className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition"
//             >
//               <h3 className="text-lg font-medium text-gray-900">
//                 {role.title}
//               </h3>
//               <p className="mt-3 text-gray-600 text-sm">{role.desc}</p>
//               <Link
//                 to="/login"
//                 className="inline-block mt-4 text-emerald-600 font-medium text-sm hover:underline"
//               >
//                 Continue →
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="py-8 text-center text-sm text-gray-500">
//         Built with care for sustainability & community impact.
//       </footer>
//     </div>
//   );
// }
