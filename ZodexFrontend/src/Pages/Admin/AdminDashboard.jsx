// import React from "react";
// import AdminCounters from "./Counters";
// import ContactQueries from "./contactQueries";

// const AdminDashboard = () => {
//   return (
//     <section>
//       <div className="grid grid-cols-2">
//         <div></div>
//         {/* <AdminCounters /> */}
//       </div>
//       {/* <ContactQueries /> */}
//     </section>
//   );
// };

// export default AdminDashboard;

import React from "react";

const AdminDashboard = () => {
  return (
    <section className="h-screen">
      <div className="h-full">
        <iframe
          src="https://zodex.in"
          title="Frontend Website"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </section>
  );
};

export default AdminDashboard;
