// const Conferences = () => {
//   return (
//     <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
//       <div className="pb-20">
//         <h1 className="text-3xl font-semibold">Events You will Love</h1>

//         <div className="flex justify-center">
//           <a
//             href="#"
//             class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
//           >
//             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
//               Coming Soon
//             </h5>
//             <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
//               Stay Tuned...
//             </p>
//           </a>
//         </div>

//         <div className="pt-20">
//           <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
//           <h1 className="text-2xl font-semibold">Past Events</h1>
//           <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
//         </div>

//         <div className="flex justify-center">
//           <a
//             href="#"
//             class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
//           >
//             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
//               Coming Soon
//             </h5>
//             <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
//               Stay Tuned...
//             </p>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conferences;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import EventBusyIcon from "@mui/icons-material/EventBusy";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// const stripHtmlTags = (content) => {
//   return content.replace(/<\/?[^>]+(>|$)/g, "");
// };
// function truncateText(text, maxLength) {
//   if (text.length > maxLength) {
//     return text.slice(0, maxLength) + "...";
//   }
//   return text;
// }

// const WebinarCard = ({ event }) => (
//   <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full">
//     <img
//       className="w-full h-48 object-cover"
//       src={`${backendURL}${event?.image}`}
//       alt={event.title}
//       style={{ minHeight: "15rem" }}
//     />
//     <div className="p-4 flex flex-col flex-grow">
//       <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900  first-letter:uppercase">
//         {event.title}
//       </h5>
//       <p className="mb-3 text-sm text-gray-700 line-clamp-3 flex-grow">
//         {truncateText(stripHtmlTags(event.content), 100)}
//       </p>
//       <Link
//         to={`/event/${event.slug}`}
//         className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
//       >
//         Read more
//         <svg
//           className="w-3.5 h-3.5 ms-2"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 14 10"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M1 5h12m0 0L9 1m4 4L9 9"
//           />
//         </svg>
//       </Link>
//     </div>
//   </div>
// );

// const Conferences = () => {
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);

//   useEffect(() => {
//     fetchWebinars();
//   }, []);

//   const fetchWebinars = async () => {
//     try {
//       const response = await fetch(`${backendURL}/api/getEvents`);
//       const data = await response.json();

//       const webinars = Array.isArray(data.events)
//         ? data.events.filter((event) => event.eventType === "conference")
//         : [];

//       const currentDate = new Date();
//       const upcoming = webinars.filter(
//         (event) => new Date(event.date) > currentDate
//       );
//       const past = webinars.filter(
//         (event) => new Date(event.date) <= currentDate
//       );

//       setUpcomingEvents(upcoming);
//       setPastEvents(past);
//     } catch (error) {
//       console.error("Error fetching webinars:", error);
//       setUpcomingEvents([]);
//       setPastEvents([]);
//     }
//   };

//   return (
//     <div className=" mt-[3rem] container mx-auto px-4 py-8 md:py-16">
//       <div className="mb-24">
//         <div className="flex items-center mb-6">
//           <EventAvailableIcon className="text-blue-600 mr-2" />
//           <h2 className="text-2xl font-medium">Events You will Love</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {upcomingEvents.map((event) => (
//             <WebinarCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//       {/* Horizontal line to separate sections */}
//       <hr className="my-8 border-t border-gray-300" />
//       <div>
//         <div className="flex items-center mb-6">
//           <EventBusyIcon className="text-blue-600  mr-2" />
//           <h2 className="text-2xl font-medium">Past Events</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pastEvents.map((event) => (
//             <WebinarCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conferences;
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { CircularProgress } from "@mui/material";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const stripHtmlTags = (content) => content.replace(/<\/?[^>]+(>|$)/g, "");

function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

const WebinarCard = ({ event }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-95 flex flex-col h-full">
    <img
      className="w-full h-48 object-cover"
      src={`${backendURL}${event?.image}`}
      alt={event.title}
      style={{ minHeight: "15rem" }}
    />
    <div className="p-4 flex flex-col flex-grow">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 first-letter:uppercase">
        {event.title}
      </h5>
      <p className="mb-3 text-sm text-gray-700 line-clamp-3 flex-grow">
        {truncateText(stripHtmlTags(event.content), 100)}
      </p>
      <Link
        to={`/event/${event.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
      >
        Read more
        <svg
          className="w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  </div>
);

const Conferences = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${backendURL}/api/getEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch conferences");
      }
      const data = await response.json();

      const conferences = Array.isArray(data.events)
        ? data.events.filter((event) => event.eventType === "conference")
        : [];

      const currentDate = new Date();
      const upcoming = conferences.filter(
        (event) => new Date(event.date) > currentDate
      );
      const past = conferences.filter(
        (event) => new Date(event.date) <= currentDate
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching conferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    ),
    []
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <div className="mt-[3rem] container mx-auto px-4 py-8 md:py-16 lg:px-12">
      <div className="pb-12">
        <h1 className="text-2xl font-semibold">Conferences</h1>
        <p className="mt-3">
          Join us for immersive conferences that bring together industry
          leaders, innovators, and experts. Experience hands-on workshops,
          engaging presentations, and valuable networking opportunities in the
          fields of Big Data, AI, and Blockchain.
        </p>
      </div>

      <div className="pb-12">
        <div className="flex items-center mb-6">
          <EventAvailableIcon className="text-btColour mr-2" />
          <h2 className="text-xl font-medium">Events You Will Love</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <WebinarCard key={event.id} event={event} />
            ))
          ) : (
            <p>No upcoming conferences available.</p>
          )}
        </div>
      </div>

      <hr className="my-8 border-t border-gray-300" />

      <div className="mt-24">
        <div className="flex items-center mb-6">
          <EventBusyIcon className="text-btColour mr-2" />
          <h2 className="text-xl font-medium">Past Events</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <WebinarCard key={event.id} event={event} />
            ))
          ) : (
            <p>No past conferences available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conferences;
