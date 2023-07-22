import maleAvatar from "../public/assets/avatar_male.svg";

// Common
export const companyName = "Bigining";

// NavBar Menu
export const lstNavBarMenu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 8, name: "Upcoming Events", path: "/upcomingEvents" },
  { id: 7, name: "Artists", path: "/artists" },
  { id: 4, name: "Work", path: "/work" },
  { id: 5, name: "FAQs", path: "/faqs" },
  { id: 6, name: "Contact", path: "/contact" },
];

// Home Page
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

// About Page
export const objHowItStartedInfo = {
  description: (
    <>
      <p className="text-lg">
        Bigining is about Biginning of Big Inning , it’s about inning which you
        have imagine to start & end it with endless memories with our Expertise
        of Creativity, Management & Network . Bigining will help you To execute
        your Event or Requirements related to Celebrity , Product Launch, PR ,
        Wedding , promotions & many More.
      </p>
      <br />
      <p className="text-lg font-medium">
        &quot;Let’s Play BiG Inning with Bigining&quot;
      </p>
    </>
  ),
};

export const objFounderInfo = {
  kewal: {
    imgSrc: maleAvatar,
    name: "Kewal Singh",
    designation: "Founder",
    description: `About Me what should i Say,
      I started learning in event industry since 2009 as a promoter . After so much of struggle & learning for 3 years First I have done Movie Promotion of “Char Din Ki Chandni” with Tushar Kapoor in 2012 That was the Turing point of my Event carrier. After this movie Promotion done so many movies Like “NAUTAKI SALA with Aayushman Khurana, “KIS KIS KO PYAR KARU With Kapil Sharma “, FLYING JATT WITH TIGHER & JACLEN , SPECIAL 26 with AKSHY KUMAR, worked with Cast Like Bipas Basu, Nora Fateh, Neha Dhupia , Sharam Joshi, Kunal Khemu, Shardha Kapoor , Siddhart Roy Kapoor, Amisha patel & Many More n more . Also done Concerts of Singers Like Arijit Singh, Badshah , Shreya Ghosal, Pritam , Neha Kakkar, Mika Singh, Milind Gaba, Falguni Pathak, Amit Trivedi & Many more .
      You know what I have learned in this learning Journey is creativity, Sales , Marketing Management & still learning.`,
  },
};
