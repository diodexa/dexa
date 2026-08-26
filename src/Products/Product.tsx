interface Project {
  title: string;
  img: string;
  demoUrl: string;
}

const projects: Project[] = [
  { title: "Flip book", 
    img: "/ProjectBook.webp", 
    demoUrl: "https://dexa-invitation.com/FlipBook" },

  { title: "Journey Leaf", 
    img: "/ProjectLeaf.webp", 
    demoUrl: "https://dexa-invitation.com/JourneyLeaf" },

  { title: "JourneyCream", 
    img: "/ProjectJourneyCream.webp", 
    demoUrl: "https://dexa-invitation.com/JourneyLeaf" },

  { title: "Group Chat", 
    img: "/projectGroupChat.webp", 
    demoUrl: "https://dexa-invitation.com/GroupChat" },
    
  { title: "Monochrome", 
    img: "/ProjectMonochrome.webp", 
    demoUrl: "https://dexa-invitation.com/Monochrome" },
];

export default projects;