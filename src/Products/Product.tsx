interface Project {
  title: string;
  img: string;
  demoUrl: string;
}

const projects: Project[] = [
  { title: "Flip book", 
    img: "/ProjectBook.webp", 
    demoUrl: "https://dexa-invitation.com/Flipbook" },

  { title: "Scroll Leaf", 
    img: "/ProjectLeaf.webp", 
    demoUrl: "https://dexa-invitation.com/ScrollLeaf" },

  { title: "Scroll Cream", 
    img: "/ProjectJourneyCream.webp", 
    demoUrl: "https://dexa-invitation.com/ScrollCream" },

  
  { title: "Group Chat", 
    img: "/projectGroupChat.webp", 
    demoUrl: "https://dexa-invitation.com/GroupChat" },
    
  { title: "Monochrome", 
    img: "/ProjectMonochrome.webp", 
    demoUrl: "https://dexa-invitation.com/Monochrome" },

  { title: "Sunflower", 
    img: "/ProjectSunflower.webp", 
    demoUrl: "https://dexa-invitation.com/Sunflower" },
];

export default projects;