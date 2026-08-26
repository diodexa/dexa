interface Project {
  title: string;
  img: string;
  demoUrl: string;
}

const projects: Project[] = [
  { title: "Flip book", 
    img: "/buku.webp", 
    demoUrl: "https://dexa-invitation.com/FlipBook" },

  { title: "Journey Leaf", 
    img: "/leaf.png", 
    demoUrl: "https://dexa-invitation.com/JourneyLeaf" },

  { title: "JourneyCream", 
    img: "/leaf.png", 
    demoUrl: "https://dexa-invitation.com/JourneyLeaf" },

  { title: "Group Chat", 
    img: "/grupchat.webp", 
    demoUrl: "https://dexa-invitation.com/GroupChat" },
    
  { title: "Monochrome", 
    img: "/grupchat.webp", 
    demoUrl: "https://dexa-invitation.com/Monochrome" },
];

export default projects;