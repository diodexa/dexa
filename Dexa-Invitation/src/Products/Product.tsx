interface Project {
  title: string;
  img: string;
  demoUrl: string;
}

const projects: Project[] = [
  { title: "Flip book", 
    img: "/buku.webp", 
    demoUrl: "https://dexa-invitation.com/Book/index.html" },

  { title: "Leaf", 
    img: "/leaf.png", 
    demoUrl: "https://dexa-invitation.com/Leaf/index.html" },

  { title: "Group Chat", 
    img: "/grupchat.webp", 
    demoUrl: "https://dexa-invitation.com/GrupChat/index.html" },

];

export default projects;