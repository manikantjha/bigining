import femaleAvatar from "../public/assets/avatar_female.svg";
import maleAvatar from "../public/assets/avatar_male.svg";

export const gradientClass = "";

// Common
export const companyName = "Bigining";

// NavBar Menu

export const lstNavBarMenu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 7, name: "Celebs", path: "/celebs" },
  { id: 4, name: "Work", path: "/work" },
  { id: 5, name: "FAQs", path: "/faqs" },
  { id: 6, name: "Contact", path: "/contact" },
];

// Home Page

export const lstFeatures = [
  {
    id: 1,
    icon: (
      <svg
        className="w-10 h-10 mb-2 text-accentDark"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        ></path>
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
      </svg>
    ),
    title: "Feature A",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem.",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-10 h-10 mb-2 text-accentDark"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        ></path>
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
      </svg>
    ),
    title: "Feature B",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem.",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-10 h-10 mb-2 text-accentDark"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        ></path>
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
      </svg>
    ),
    title: "Feature C",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem.",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-10 h-10 mb-2 text-accentDark"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        ></path>
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
      </svg>
    ),
    title: "Feature D",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, exercitationem.",
  },
];

export const lstFigures = [
  { id: 1, figure: "100+", description: "Projects" },
  { id: 2, figure: "50", description: "Homes" },
  { id: 3, figure: "200+", description: "Happy Customers" },
  { id: 4, figure: "2", description: "Cities" },
];

export const lstTestimonials = [
  {
    id: 1,
    client: {
      imgSrc: "/assets/avatar_male.svg",
      name: "John Doe",
      designation: "Owner at XYZ",
    },
    title: "Lorem ipsum dolor sit amet.",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil.",
  },
  {
    id: 2,
    client: {
      imgSrc: "/assets/avatar_female.svg",
      name: "John Doe",
      designation: "Owner at XYZ",
    },
    title: "Lorem ipsum dolor sit amet.",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil.",
  },
  {
    id: 3,
    client: {
      imgSrc: "/assets/avatar_female.svg",
      name: "John Doe",
      designation: "Owner at XYZ",
    },
    title: "Lorem ipsum dolor sit amet.",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil.",
  },
  {
    id: 4,
    client: {
      imgSrc: "/assets/avatar_male.svg",
      name: "John Doe",
      designation: "Owner at XYZ",
    },
    title: "Lorem ipsum dolor sit amet.",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil.",
  },
];

export const lstServices = [
  {
    id: 1,
    title: "Service A",
    checklist: [
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor sit amet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
  },
  {
    id: 2,
    title: "Service B",
    checklist: [
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor sit amet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
  },
  {
    id: 3,
    title: "Service C",
    checklist: [
      "Lorem, ipsum dolor.",
      "Lorem ipsum dolor sit amet.",
      "Lorem ipsum dolor sit amet consectetur adipisicing.",
      "Lorem ipsum dolor sit amet consectetur.",
    ],
  },
];

// About Page

export const objHowItStartedInfo = {
  description: (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        veniam tempore minus amet, impedit blanditiis omnis saepe accusamus
        quidem quibusdam quam eum molestias fugit minima quos hic sint
        doloremque voluptate? Quos voluptatum, qui quaerat deserunt itaque
        facere vitae amet quae. Corrupti ut rem iste repellat repellendus enim
        impedit fuga sint. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ad deleniti quibusdam vero nostrum magnam, tempora quod quisquam,
        nobis doloremque distinctio maxime! Numquam natus maiores illo quod
        veniam aperiam aut voluptates.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        veniam tempore minus amet, impedit blanditiis omnis saepe accusamus
        quidem quibusdam quam eum molestias fugit minima quos hic sint
        doloremque voluptate? Quos voluptatum, qui quaerat deserunt itaque
        facere vitae amet quae. Corrupti ut rem iste repellat repellendus enim
        impedit fuga sint. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Ad deleniti quibusdam vero nostrum magnam, tempora quod quisquam,
        nobis doloremque distinctio maxime! Numquam natus maiores illo quod
        veniam aperiam aut voluptates.
      </p>
    </>
  ),
};

export const objFounderInfo = {
  raja: {
    imgSrc: maleAvatar,
    name: "Raja Singh",
    designation: "Founder",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos explicabo quibusdam doloremque  oluptates libero odit non praesentium  repellendus magni aliquid vel, possimus odio expedita obcaecati! Fugiat perferendis minima corporis mollitia perspiciatis, placeat accusantium nesciunt commodi dolores et sint quae sit? Sapiente, ducimus quaerat. Cupiditate repellendus nemo animi numquam hic velit.",
  },
  ghanshyam: {
    imgSrc: maleAvatar,
    name: "Ghanshyam Parmar",
    designation: "Co-Founder",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos explicabo quibusdam doloremque  oluptates libero odit non praesentium  repellendus magni aliquid vel, possimus odio expedita obcaecati! Fugiat perferendis minima corporis mollitia perspiciatis, placeat accusantium nesciunt commodi dolores et sint quae sit? Sapiente, ducimus quaerat. Cupiditate repellendus nemo animi numquam hic velit.",
  },
};

export const lstTeamMembers = [
  {
    id: 1,
    imgSrc: maleAvatar,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officiis.",
  },
  {
    id: 2,
    imgSrc: femaleAvatar,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officiis.",
  },
  {
    id: 3,
    imgSrc: femaleAvatar,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officiis.",
  },
  {
    id: 4,
    imgSrc: maleAvatar,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officiis.",
  },
  {
    id: 5,
    imgSrc: maleAvatar,
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officiis.",
  },
];

// Services Page

export const lstPackages = [
  {
    id: 1,
    name: "1BHK Interior",
    price: "1,00,000",
    lstFeatures: [
      { id: 1, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 2, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 3, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 4, isIncluded: false, feature: "Lorem ipsum dolor sit amet." },
      { id: 5, isIncluded: false, feature: "Lorem ipsum dolor sit amet." },
      { id: 6, isIncluded: false, feature: "Lorem ipsum dolor sit amet." },
    ],
  },
  {
    id: 2,
    name: "2BHK Interior",
    price: "2,00,000",
    lstFeatures: [
      { id: 1, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 2, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 3, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 4, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 5, isIncluded: false, feature: "Lorem ipsum dolor sit amet." },
      { id: 6, isIncluded: false, feature: "Lorem ipsum dolor sit amet." },
    ],
  },
  {
    id: 3,
    name: "3BHK Interior",
    price: "3,00,000",
    lstFeatures: [
      { id: 1, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 2, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 3, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 4, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 5, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
      { id: 6, isIncluded: true, feature: "Lorem ipsum dolor sit amet." },
    ],
  },
];

// FAQS Page

export const lstFAQs = [
  {
    id: 1,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, obcaecati?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita repellat quisquam rem reiciendis natus dicta doloribus, nihil error maxime quam qui aspernatur saepe voluptate!",
  },
  {
    id: 2,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, obcaecati?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita repellat quisquam rem reiciendis natus dicta doloribus, nihil error maxime quam qui aspernatur saepe voluptate!",
  },
  {
    id: 3,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, obcaecati?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita repellat quisquam rem reiciendis natus dicta doloribus, nihil error maxime quam qui aspernatur saepe voluptate!",
  },
  {
    id: 4,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, obcaecati?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita repellat quisquam rem reiciendis natus dicta doloribus, nihil error maxime quam qui aspernatur saepe voluptate!",
  },
  {
    id: 5,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, obcaecati?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita repellat quisquam rem reiciendis natus dicta doloribus, nihil error maxime quam qui aspernatur saepe voluptate!",
  },
];

// Contact Page

export const objContactInfo = {
  title: "Have a project in mind?",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam similique non nemo incidunt illum suscipit laborum eligendi nisi dolores rem dicta, corrupti facilis. Magni, vero!",
  lstContactInfo: [
    {
      id: 1,
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-4 h-4 mr-2 shrink-0"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
          />
        </svg>
      ),
      info: "rjinterior@gmail.com",
    },
    {
      id: 2,
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-4 h-4 mr-2 shrink-0"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          />
        </svg>
      ),
      info: "+91 55555 66666",
    },
    {
      id: 3,
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-4 h-4 mr-2 shrink-0"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          />
        </svg>
      ),
      info: "+91 77777 66666",
    },
    {
      id: 4,
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-4 h-4 mr-2 shrink-0"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      ),
      info: "Surat, Gujarat, India",
    },
  ],
};
